$(() => {
  function buildHTML(message) {
    let image = message.image.url ? `<img src="${message.image.url}" class="message__image"></div>` : ``
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
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = ($('.chat-content')[0]) ? $('.chat-content:last').data('message-id') : 0;
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: location.href,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
});

$(function() {
  $(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(update, 5000);
    } else {
      clearInterval();
  }
  })
});
});
