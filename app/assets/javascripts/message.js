var buildMessageHTML = function(message) {
  if (message.content && message.image.url) {
    //data-idが反映されるようにしている
    var html = '<div class="message" data-id=' + message.id + '>' +
      '<div class="upper-message">' +
        '<div class="upper-message__user-name">' +
          message.user_name +
        '</div>' +
        '<div class="upper-message__date">' +
          message.created_at +
        '</div>' +
      '</div>' +
      '<div class="lower-message">' +
        '<p class="lower-message__content">' +
          message.content +
        '</p>' +
        '<img src="' + message.image.url + '" class="lower-message__image" >' +
      '</div>' +
    '</div>'
  } else if (message.content) {
    //同様に、data-idが反映されるようにしている
    var html = '<div class="message" data-id=' + message.id + '>' +
      '<div class="upper-message">' +
        '<div class="upper-message__user-name">' +
          message.user_name +
        '</div>' +
        '<div class="upper-message__date">' +
          message.created_at +
        '</div>' +
      '</div>' +
      '<div class="lower-message">' +
        '<p class="lower-message__content">' +
          message.content +
        '</p>' +
      '</div>' +
    '</div>'
  } else if (message.image.url) {
    //同様に、data-idが反映されるようにしている
    var html = '<div class="message" data-id=' + message.id + '>' +
      '<div class="upper-message">' +
        '<div class="upper-message__user-name">' +
          message.user_name +
        '</div>' +
        '<div class="upper-message__date">' +
          message.created_at +
        '</div>' +
      '</div>' +
      '<div class="lower-message">' +
        '<img src="' + message.image.url + '" class="lower-message__image" >' +
      '</div>' +
    '</div>'
  };
  return html;
};
