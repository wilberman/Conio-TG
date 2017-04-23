/*
Servidor Con.IO - Microchat
Projeto para graduação do curso de Tecnologo em Analise e Desenvolvimento de Sistemas da Fatec Taubaté.
Alunos: Felipe Rodrigues - Wlber Ribas
Orientador : Luiz Eduardo Souza Evangelista
Ano 2017
*/

var express = require('express');
var app = require('express')();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var session = require('express-session');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/server/views');
app.engine('html', require('ejs').renderFile);

var formidable = require('formidable');
util = require('util');
var bodyParser  = require('body-parser');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(5);

var uuid = require('uuid'); //gerador de strings aleatorios


/*app.use(session({
  secret: 'gohorse',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))*/

app.use(session({secret: 'gohorse'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

var mysql = require("mysql");
var banco_dados = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'conio_bd'
});

banco_dados.connect(function(err){
  if(err){
    log('Erro ao conectar na base de dados');
    return;
  }
  log('Conexao efetuada com sucesso.');
});




var usuarios = [];
var conexoes = [];

//para fins de teste

var nome_user=["Kenji","Orlando","Levi","Luiz Paulo"];
var sobrenome_user=["Taniguchi","Rosa","Rodrigo","Zanetti"];
var email_user=["kenji@kenji.com","orlando@ihc.com","leviVBA@petrobras.com.br","zanettiConio-h-borland@borland.com"];
var frase_user=["Sono Polifasico *-*","Sdds Cabelo na testa","Dim LEVI as VBA master","Turbo C que era bom... o resto eh resto"];
var foto_user=["kenji.png","orlando.png","levi.png","zanetti.png"];

//fim do teste

function log(mensagem){

    /* todos os eventos de log sao passados para esta funcao, que adiciona a 
    data de ocorrencia e imprime no console a msg.*/
    var data = new Date;
    console.log('['+ data.getHours()+':'+data.getMinutes()+':'+data.getSeconds()+' ] : '+ mensagem);
};

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function geraNomeAleatorio(filename){
	var temp_ext=getExtension(filename);
	log("extensao: "+temp_ext);
	
	var novo_nome = uuid.v4() + temp_ext;
	
	log("novo arquivo "+ novo_nome);
	return novo_nome;
}

function geraPassword(senha){
     var result = bcrypt.hashSync(senha,salt);
    return result;
}

function cadastraUsuario(dados,callback){
        var str_query = 'insert into tbl_usuarios (`usu_nome`,`usu_sobrenome`,`usu_username`,`usu_bio`,`usu_email`,`usu_senha`,`usu_imagem`) values ("'+dados.nome+'","'+dados.sobrenome+'","'+dados.username+'","'+dados.bio+'","'+dados.email+'","'+dados.senha+'","'+dados.imagem+'")';
        log("insert = "+str_query);
        banco_dados.query(str_query,function(err,result){
            if (err) {
                callback(err, null);
            } else 
                log("sucesso no insert: "+result.insertId);
                callback(null, result.insertId); 
});
}



function buscaUsuario(email,callback){
        var str_query = 'select * from tbl_usuarios where usu_email = "'+email+'";';
        log(str_query);
        banco_dados.query(str_query,function(err,rows){
            if (err) {
                callback(err, null);
            } else 
                callback(null, rows); 
});
}

function listaBloqueios(id,callback){
        var str_query = 'select id_bloqueado from tbl_bloqueios where id_bloqueante ='+id+';';
        log(str_query);
        banco_dados.query(str_query,function(err,rows){
            if (err) {
                callback(err, null);
            } else 
                callback(null, rows); 
});
}

function checaUsuario(username,callback){
        var str_query = 'select * from tbl_usuarios where usu_username = "'+username+'";';
        log(str_query);
        banco_dados.query(str_query,function(err,rows){
            if (err) {
                callback(err, null);
            } else 
                callback(null, rows); 
});
}

server.listen(process.env.PORT || 3000);
log('Servidor rodando na porta 3000');

//Criacao das rotas

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res){ //rota de login
  res.sendFile(__dirname + '/public/login3.html');
});

app.get('/teste', function(req, res){
  res.sendFile(__dirname + '/public/teste.html');
});


app.get('/', function(req, res){

        /*Rota Raiz. Verifica se existe sessao ativa, caso nao exista
        redireciona para a rota de login*/

        sess = req.session;
        log("/ "+JSON.stringify(sess));
        if(sess.email) {
            res.redirect('/home');
        }
        else {
            res.redirect('/login');
        }

});

app.post('/login',function(req,res){
    sess = req.session;
    sess.email=req.body.email;
    

    buscaUsuario(req.body.email, function(err, retorno) {
        if (err) {
            console.log(err);

        } else {
            if (retorno.length > 0) {
                bcrypt.compare(req.body.senha, retorno[0]["usu_senha"], function(err, matches) {
                    if (err)
                        console.log('Erro ao checar as senhas');
                    else if (matches){
                        console.log('As senhas coincidem!');
                        sess.id_user = retorno[0]["usu_id"];
                        sess.nome_usuario=retorno[0]["usu_nome"];
                        sess.sobrenome = retorno[0]["usu_sobrenome"];
                        sess.username = retorno[0]["usu_username"];
                        sess.usu_bio=retorno[0]["usu_bio"];
                        sess.usu_imagem=retorno[0]["usu_imagem"];
                        //log(JSON.stringify(retorno));

                        log("Usuario conectado: "+retorno[0]["usu_nome"]);
                        res.send("ok");
                    }
                        
                    else{
                        console.log('As senhas nao coincidem');
                        res.send("erro");
                    }
                        
                });
            }
            else {
                log("erro no login");
                res.send('erro');
            }
        }
    });
});

app.post('/checaUsuarioBD', function(req,res){

    checaUsuario(req.body.usuario, function(err, retorno) { //verifica se o email passado ja foi cadastrado, se foi, retorna erro
        if (err) {
           console.log(err);
        } else {
            if (retorno.length > 0) { //o username ja foi cadastrado
                res.send("usuario_existente");                       
            }
            else {
                 res.send("usuario_novo");            
            }
        }
        }); 

});

app.get('/getUsuarioAtivo', function(req,res){
//rota que envia um objeto json contendo os dados do usuario ativo
    sess = req.session;
    log("requisicao ajax");
        if(sess.email) {
           
          
           var jsonString={id: sess.id_user,
                    Nome: sess.nome_usuario,
                    Sobrenome: sess.sobrenome,
                    Username: sess.username,
                    bio: sess.usu_bio,
                    Imagem: sess.usu_imagem,
                    email: sess.email
                };
                log(jsonString);
    res.contentType('application/json');
    //res.status(400).json(JSON.stringify(jsonString));
        res.format({
            'application/json': function(){
                res.send(JSON.stringify(jsonString),null,3);
             }
        });
        }
});

app.get('/getListaBloqueio', function(req,res){
//rota que envia um objeto json contendo os dados de usuarios bloqueados
    sess = req.session;
    log("requisicao ajax - lista bloqueio");
        if(sess.email) {


            listaBloqueios(41, function(err, retorno) { //verifica se o email passado ja foi cadastrado, se foi, retorna erro
                if (err) {
                console.log(err);
                } else {
                    if (retorno.length > 0) { //o existem usuarios bloqueados
                        log(retorno);
                        res.send(retorno);                       
                    }
                    else {
                        res.send("vazio");            
                    }
        }
        });


           


            res.contentType('application/json');
            //res.status(400).json(JSON.stringify(jsonString));
                res.format({
                    'application/json': function(){
                        //res.send(JSON.stringify(jsonString),null,3);
             }
        });
        }
});


app.post('/checaEmailBD', function(req,res){

    buscaUsuario(req.body.email, function(err, retorno) { //verifica se o email passado ja foi cadastrado, se foi, retorna erro
        if (err) {
           console.log(err);

        } else {
            if (retorno.length > 0) { //o username ja foi cadastrado
                res.send("email_existente");                       
            }
            else {
                 res.send("email_novo");            
            }
        }
        }); 

});



app.post('/cadastro', function (req, res){
    var senha_cript = geraPassword(req.body.passwordinput);
    var user_data  = {  nome: req.body.txt_nome,
			   sobrenome: req.body.txt_sobrenome,
			   username: req.body.txt_username,
			   bio: req.body.txt_bio,
			   imagem: req.body.imagem,
			   email: req.body.txt_email,
			   senha: senha_cript} ;

    cadastraUsuario(user_data, function(err, retorno) {
        if (err) {
            console.log(err);
            res.send('erro');
        } else {
            if (retorno.length !== 0 || retorn!==null) {
                res.send('sucesso');
            }
            else {
                log("erro no cadastro");
                res.send('erro');
            }
        }
    });




    //res.send("bazzinga");
    //res.sendFile(__dirname + '/index.html');
});

app.post('/upload_imagem', function (req, res){
    var form = new formidable.IncomingForm();
	var n_filename;
    form.parse(req);

    form.on('fileBegin', function (name, file){
		n_filename = geraNomeAleatorio(file.name);
		file.path = __dirname + '/public/avatares/' + n_filename;
    });
    form.on('file', function (name, file){
		res.send(n_filename);
    });
    
});



/*app.post('/cadastro',function(req,res){

    log("imagem: "+req.body.profile_pic[0]);

    
  var post  = {Nome: req.body.txt_nome,
			   Sobrenome: req.body.txt_sobrenome,
			   Username: req.body.txt_username,
			   bio: req.body.txt_bio,
			   imagem: 'kenji.png', //por enquanto deixar essa imagem como padrao
			   email: req.body.txt_email,
			   senha: req.body.txt_senha1};

    cadastraUsuario(post, function(err, retorno) {
        if (err) {
            console.log(err);
            // Do something with your error...
            res.send('erro');
        } else {
                res.send('ok');
            }
});

});*/


app.get('/home',function(req,res){
    sess = req.session;
    //log(JSON.stringify(sess));
    if(sess.email) {
        // if(err) {

        // }else{


        // }
    /*res.write('<h1>Hello '+sess.email+'</h1>');
    res.end('<a href="+">Logout</a>');*/
    res.sendFile(__dirname + '/public/home.html'); 

    } else {
        res.write('<h1>Sessao Expirada. Por favor, efetue login para continuar.</h1> ');
        res.end('<a href="/login">Login</a>');
    }
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/');
    }
    });
});





// Comunicacao assincrona via socket io
io.on('connection', function(socket){

    conexoes.push(socket);

    log('Conectado: '+conexoes.length+' sockets conectados.');

    //io.sockets.emit('atualiza_lista',enviaListaClientsAtivos());
   //     log('Json enviado')
 
    socket.on('enviar', function(msg){
        var data = new Date().toLocaleString();
        //log("JSON msg :"+ JSON.parse(msg));
        msg.push(data);
        log("Mensagem: "+msg);
        io.emit('enviar', msg);
  });


    
    socket.on('disconnect', function(dados){
        conexoes.splice(conexoes.indexOf(socket), 1);
        console.log('Desconectado: %s sockets conectados', conexoes.length);
        io.sockets.emit('atualiza_lista',enviaListaClientsAtivos());
        log('Json enviado')
    });

  
  socket.on('disconnect', function () {
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        total_usuarios: conexoes.length
      });
    }
);

socket.on('add user', function (username) {
    /*if (addedUser) return;

    // we store the username in the socket session for this client
    
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });*/
    // echo globally (all clients) that a person has connected
    socket.username = username;
    socket.broadcast.emit('user joined', {
      username: socket.username,
      total_usuarios: conexoes.length
    });
  });

    
    
});

function enviaListaClientsAtivos(){
    var i;
    var lista=[];
    var user;

    Object.keys(io.sockets.sockets).forEach(function(id) {
        user = '["idSocket" : "'+id+'", "Nome" : "'+nome_user[id]+'", "Sobrenome" : "'+sobrenome_user[id]+'", "email": "'+email_user[id]+'", "frase": "'+frase_user[id]+'", "foto": "'+foto_user[id]+'"]';
       // log(temp);
        lista.push({user});
    })
    var msg_json=JSON.parse(JSON.stringify(lista));
    console.log("JSON: " + JSON.stringify(msg_json));

return msg_json;
    
}













