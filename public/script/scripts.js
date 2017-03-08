(function () {
                var Message;
				
                Message = function (arg) {
                    this.text = arg.text, this.message_side = arg.message_side;
					
                    this.draw = function (_this) {
                        return function () {
                            var $message;
							var data = new Date().toLocaleString();;
                            $message = $($('.message_template').clone().html());
							$dt_envio = $($('.dt_envio').clone().html());
							
                            $message.addClass(_this.message_side).find('.text').html(_this.text);
							$dt_envio.find('.text').html('teste');
                            $('.messages').append($message);

							if(_this.message_side =='right'){
								$('.messages').append("<span class='data_envio esquerda'>"+'Enviado em '+data+'</span>');
							}
							if(_this.message_side =='left'){
								$('.messages').append("<span class='data_envio direita'>"+'Enviado em '+data+'</span>');
							}
                            return setTimeout(function () {
                                return $message.addClass('appeared');
								
                            }, 0);
                        };
                    }(this);
                    return this;
                };
                $(function () {
                    var getMessageText, message_side, sendMessage;
                    getMessageText = function () {
                        var $message_input;
                        $message_input = $('.message_input');
                        return $message_input.val();
                    };
                    sendMessage = function (text,side) {
                        var $messages, message;
						message_side=side;
                        if (text.trim() === '') {
                            return;
                        }
                        $('.message_input').val('');
                        $messages = $('.messages');
						
						message_side = side;
						if(message_side=='right'){
							$('.messages .message.right .avatar').css({'background-image':'url("orlando.png")'});	
						}
						
                        message = new Message({
                            text: text,
                            message_side: message_side
                        });
                        message.draw();
                        return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
                    };
                    $('.send_message').click(function (e) {
                        return sendMessage(getMessageText(),'left');
                    });
					$('.btn_emoticon').click(function (e) {
                        return sendMessage(getMessageText(),'right');
                    });
                    $('.message_input').keyup(function (e) {
                        if (e.which === 13) {
                            return sendMessage(getMessageText());
                        }
                    });
                    
                });
            }.call(this));