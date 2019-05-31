$(() => {
  function buildHTML(message) {
    let image = ""
    if (message.image.url) {
      image = `<img src="${message.image.url}" class="message__image"></div>`;
    }
    const html = `<div class="message" message_id="${message.id}>
                  <h3 class="message__name">${message.user_name}</h3>
                  <p class="message__date">${message.created_at}</p>
                  <p class="message__body">${message.body}</p>
                  ${image}
                </div>`
    return html;
  }

  const path = window.location.pathname;
  const group_id  = $('.group-info__group-name').attr('group_id');

  // メッセージ送信
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    $.ajax({
      url: path,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      $('.chat').append(buildHTML(data));
      $('.input-box__text').val("");
      $('.input-box__file-send').val("");
      // メッセージが増えていくdivのscrollHeightを使ってスクロール
      $('.chat').animate({
        scrollTop: $('.chat')[0].scrollHeight
      }, 200);
    })
    .fail(function() {
      alert("通信に失敗しました");
    });

    setTimeout(function() {
      $(".form__send-btn").prop('disabled', false)
    }, 1000);
  });

  // 自動更新
  if (path == `/groups/${group_id}/messages`) {
    setInterval(function() {
      const latest_id = $('.message:last').attr('message_id');
      $.ajax({
        url: path,
        data: {
          latest_id: latest_id
        },
        dataType: 'json'
      })
      .done(function(data) {
        if (data.length != 0) {
          $.each(data, function(i, message) {
            $('.chat').append(buildHTML(message));
          });
          $('.chat').animate({
            scrollTop: $('.chat')[0].scrollHeight
          }, 200);
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      });
    }, 5000);
  }
});
