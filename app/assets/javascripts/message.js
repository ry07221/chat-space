$(function() {
  function buildHTML(message){
    var message_image = ''
    if (message.image){
      message_image = `<image src = "${message.image}" class = "bottom__message__image">`
    }
    var html = `<div class =  messages date_message_id = ${message.id}}>
                 <div class = "messages__user__name">
                     "${message.name}}">
                 </div>
                 <div class = "messages__date">
                      ${message.date}
                 </div>
                 <div class = "messages__content">
                      <p class ="messages-content">${message.text}</p>
                   ${addimage}
                 </div>
                </div>` ;
                 
    return html ; 
  }
                    

$('#message_form').on('submit' , function(e){
  e.preventDefault() ;
  var url = $(this).attr('action') ;
  var formData = new FormData($this) ;


$.ajax({
  url: url ,
  type: "POST" ,
  data: formData ,
  dataType: 'json' ,
  processData: false ,
  contentType: false ,
})

.done(function(message){
  var html = buildHTML(message) ;
  $('message_content').append(html) ;
  $('message_content').animate({scrollTop: $(".message_content")[0].scrollHeight} , 'fast') ;
})


.fail(function(){
  alert('error');
})
})
})

