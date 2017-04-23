var socket = io();
var snd = new Audio("som.mp3");


var nome_usuario;
var img_usuario;
var blackList = [];
//var msg_json_env;
//var msg_rec;

/*socket.on('welcome',function(){
   //nao exibe nada ao usuario ao entrar
});

socket.on('user in', function(data){
geraMensagem('Novo usuario na sala','kenji');
});*/

/*socket.on('connection', function(data){
    alert('users');
    var users=[];
    
    

    for(var i in data.idUsuario){
        users.push(data[i]);
    }
    alert(users);

    for (var y in users){
        geraListaUsuariosAtivos(users.nome[i],users.sobrenome[i],users.email[i],users.bio[i],users.imagem[i]);
    }

});*/

function nick (){
    nome_usuario = prompt("Digite seu nome", "kenji");
    img_usuario = nome_usuario+".png";
    socket.emit('add user', nome_usuario);
    /*if(nome_usuario!="levi"){
        blackList.push("levi");
    }*/

    return false;
}

function removeBlock(){
    alert(blackList);
    var user = prompt("Quem voce deseja desbloquear?", "levi");
    for(var i in blacklist){
    if(blacklist[i]==user){
        blacklist.splice(i,1);
        alert("Desbloqueado");
        break;
    }
}
return false;
}

function blockUser(){
    var user = prompt("Quem voce deseja bloquear?", "levi");
    blackList.push(user);
    alert(blackList);
    return false;
    
}




function enviarMsg(texto){
	//msg_json_env= JSON.stringify('{"emissor": "'+ nome_usuario + '",'+ '"msg":"'+texto+'"}');
    var msg = [nome_usuario,texto];
    socket.emit('enviar', msg);
    jQuery("#texto_usuario").empty();
	
    //alert('enviamsg');
    return false;
    
  };

  socket.on('disconnect', function () {

  });

  socket.on('user joined', function (data) {
      if (data.username ==null){//arrumar depois

      }else{

    geraMsgSistema(data.username+' entrou na sala.');
    jQuery("#label_users_ativos").text('Usuários Online nesta sala: '+data.total_usuarios);
      }
   
  });

  socket.on('user left', function (data) { //arrumar depois
    if (data.username==null){

         }else{
             

        geraMsgSistema(data.username+' saiu da sala.');
        jQuery("#label_users_ativos").text('Usuários Online nesta sala: '+data.total_usuarios);
          
      }

    
  });

socket.on('enviar', function(mensagem){
       // msg_rec = JSON.parse(mensagem);
       //nao esquecer de mudar o if para objeto json
       if(blackList.indexOf(mensagem[0]) > -1){

       }
       else{
           
           geraMensagem(mensagem);
       }
        
      });


function geraMsgSistema(msg){

    tpl_msg ='<div class= "container_broadcast container" style="width:100%">'+
              '<div class="broadcast_sistema text-xs-center">'+
              msg+
              '</div><br></div>';

              if($('#cb_ativaSom').is(":checked")){
		        snd.play();
	          }

    jQuery("#mensagens").append(tpl_msg);
	jQuery("#mensagens").animate({scrollTop: $('#mensagens').prop("scrollHeight")}, 800);
    

    return false;

}


  function geraMensagem(mensagem) {
    
    /*TODO
    implementar o recebimento da resposta por json*/

    var lado_msg ='right';
	var cor_header='danger';
	if(mensagem[0]==nome_usuario){
		lado_msg='left';
		cor_header='primary';
	}
	
    

	/*var tpl_mensagem = "<li class='media'> <div class='media-body'>"+
					"<div class='media'>  <a class='pull-left' href='#'>"+
					"<img class='media-object img-circle msg_avatar' src='css/"+mensagem[0]+".png' /> </a>"+
                    "<div class='media-body' >"+
					mensagem[1]+
                    "<br /> <small class='text-muted'>"+
					mensagem[0]+" | em "+ mensagem[2]+
					"</small> <hr /> </div> </div></div></li>";*/

                    var tpl_mensagem = "<li class='media'> <div class='media-body bs-callout bs-callout-"+cor_header+"-"+lado_msg+"'>"+
					"<div class='media'>  <a class='pull-"+lado_msg+"' href='#'>"+
					"<img class='media-object img-circle msg_avatar' src='css/"+mensagem[0]+".png' /> </a>"+
                    "<div class='media-body' >"+
					mensagem[1]+
                    "<small class='text-muted'> <br /> <br><p>"+
					mensagem[0]+" | em "+ mensagem[2]+
					"</p></small></div> </div></div></li>";



    if($('#cb_ativaSom').is(":checked")){
		snd.play();
	}

    jQuery("#mensagens").append(tpl_mensagem);
	jQuery("#mensagens").animate({scrollTop: $('#mensagens').prop("scrollHeight")}, 800);
    
    if(isMobile==true){
        alert("mobile");
        navigator.vibrate(50);
    }

    return false;
}




var themes = {
    "default": "css/bootstrap.css",
    "cerulean" : "css/bootstrap-cerulean.min.css",
    "cosmo" : "css/bootstrap-cosmo.min.css",
    "cyborg" : "css/bootstrap-cyborg.min.css",
	"darky" : "css/bootstrap-darky.min.css",
    "flatly" : "css/bootstrap-flatly.min.css",
    "journal" : "css/bootstrap-journal.min.css",
	"lumen" : "css/bootstrap-lumen.min.css",
	"paper" : "css/bootstrap-paper.min.css",
    "readable" : "css/bootstrap-readable.min.css",
	"sandstone" : "css/bootstrap-sandstone.min.css",
    "simplex" : "css/bootstrap-simplex.min.css",
    "slate" : "css/bootstrap-slate.min.css",
    "spacelab" : "css/bootstrap-spacelab.min.css",
	"superhero" : "css/bootstrap-superhero.min.css",
    "united" : "css/bootstrap-united.min.css",
	"yeti" : "css/bootstrap-yeti.min.css"
}




function geraListaUsuariosAtivos(nome,sobrenome,email,bio,imagem){


//gera o html do modal
var nomeModal = nome.replace(/\s+/g, ''); //apaga espacos vazios, caso o nome do usuario seja nome composto

var modal = "<!-- Modal "+nome+"-->"+
"<div id='modal"+nomeModal+"' class='modal fade' role='dialog'>"+
  "<div class='modal-dialog'>"+
    "<div class='modal-content'>"+
      "<div class='modal-header'>"+
        "<button type='button' class='close' data-dismiss='modal'>&times;</button>"+
        "<h4 class='modal-title'>"+nome+" "+sobrenome+"</h4>"+
      "</div>"+
      "<div class='modal-body'>"+
       "<center>"+
                    "<img src='css/"+imagem+"' name='sobre"+nome+"' width='100' height='100' border='0' class='img-circle'></a>"+
                    "<h3 class='media-heading'>"+nome+" - <small>Brasil</small></h3>"+
                    "<p><span><strong>Interesses: </strong></span></p>"+
                        "<p><span class='label label-warning'>MariaDB</span></p>"+
                        "<p><span class='label label-info'>Acesso Remoto</span></p>"+
                        "<p><span class='label label-success'>CassandraDB</span></p>"+
                        "<p><span><strong>E-mail: </strong></span></p>"+
                        "<p><span class='label label-danger'>"+email+"</span></p>"+
                    "</center>"+
                    "<hr>"+
                    "<center>"+
                    "<p class='text-left'><strong>Bio: </strong><br>"+
                    bio+
                    "<br>"+
                    "</center>"+
      "</div>"+
      "<div class='modal-footer'>"+
      "<center>"+
        "<button type='button' class='btn btn-success', data-dismiss='modal'>Iniciar chat</button>"+
        "<button type='button' class='btn btn-danger', data-dismiss='modal'>Fechar</button>"+
        "</center>"+
      "</div>"+
    "</div>"+
  "</div>"+
"</div>";


//atuliza lista de usuarios ativos

var usuario="<li class='media' data-toggle='modal' data-target='#modal"+nomeModal+"'> "+
                  "<div class='media-body'>"+
                    "<div class='media'>"+
                      "<a class='pull-left' href='#'>"+
                      "<img class='media-object img-circle' style='max-height:40px;' src='css/"+imagem+"'>"+
                    "</a>"+
                      "<div class='media-body'>"+
                        "<h5>"+nome+" "+sobrenome+"</h5>"+
                        "<small class='text-muted'>"+bio+"</small>"+
                      "</div>"+
                    "</div>"+
                  "</div>"+
                "</li>";
                jQuery('body').append(modal);
                jQuery('#usuarios').append(usuario);
                window.navigator.vibrate(200); 
                return true;

}


$(function(){ //altera o tema da pagina
   var themesheet = $('<link href="'+themes['default']+'" rel="stylesheet" />');
    themesheet.appendTo('head');
    $('.theme-link').click(function(){
       var themeurl = themes[$(this).attr('data-theme')];
        themesheet.attr('href',themeurl);
    });
});

//carrega lista de bloqueios

function carregaBlackList(){

    // todo: mudar depois para array de id de usuarios bloqueados

    blackList.push(prompt("Digite um nick para bloquear", ""));
    alert(blackList);

return true;
}

  
  




  
