var emoticonsMap = {
    ':bowtie:':'bowtie.png',
    ':laughing:':'laughing.png',
    ':relaxed:':'relaxed.png',
    ':kissing_heart:':'kissing_heart.png',
    ':relieved:':'relieved.png',
    ':wink:':'wink.png',
    ':grinning:':'grinning.png',
    ':stuck_out_tongue:':'stuck_out_tongue.png',
    ':frowning:':'frowning.png',
    ':grimacing:':'grimacing.png',
    ':expressionless:':'expressionless.png',
    ':sweat:':'sweat.png',
    ':pensive:':'pensive.png',
    ':fearful:':'fearful.png',
    ':cry:':'cry.png',
    ':astonished:':'astonished.png',
    ':tired_face:':'tired_face.png',
    ':triumph:':'triumph.png',
    ':mask:':'mask.png',
    ':no_mouth:':'no_mouth.png',
    ':smile:':'smile.png',
    ':smiley:':'smiley.png',
    ':blush:':'blush.png',
    ':smirk:':'smirk.png',
    ':kissing_closed_eyes:':'kissing_closed_eyes.png',
    ':satisfied:':'satisfied.png',
    ':stuck_out_tongue_winking_eye:':'stuck_out_tongue_winking_eye.png',
    ':kissing:':'kissing.png',
    ':sleeping:':'sleeping.png',
    ':anguished:':'anguished.png',
    ':confused:':'confused.png',
    ':unamused:':'unamused.png',
    ':disappointed_relieved:':'disappointed_relieved.png',
    ':disappointed:':'disappointed.png',
    ':cold_sweat:':'cold_sweat.png',
    ':bamboo:':'bamboo.png',
    ':gift_heart:':'gift_heart.png',
    ':dolls:':'dolls.png',
    ':school_satchel:':'school_satchel.png',
    ':mortar_board:':'mortar_board.png',
    ':flags:':'flags.png',
    ':fireworks:':'fireworks.png',
    ':trollface:':'trollface.png'
};

function converteEmoticon(emoticon) {
   $('.popover').hide();
    var formatedWord = emoticon.split(' ').map(function(word, i) {
      if(emoticonsMap[word]) {
        word = "<img class= \'emoticon-text\' src= \'img/"+ emoticonsMap[word] + "\' >";
        //alert(word);
      }
      return word;
    });

    $('#texto_usuario').append(formatedWord.join(' '));
    $('#texto_usuario').val(formatedWord.join(' '));
  };