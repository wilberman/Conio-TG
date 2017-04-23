var express = require('express');
var app = require('express')();
//var http = require('http').Server(app);
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);



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

server.listen(process.env.PORT || 3000);
log('Servidor rodando na porta 3000');

//Criacao das rotas
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/prototipo2.html');
});
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/login2.html');
});
app.get('/teste', function(req, res){
  res.sendFile(__dirname + '/public/teste.html');
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













