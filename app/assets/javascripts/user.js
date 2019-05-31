$(() => {
  function appendUser (user) {
    const html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    user_list.append(html);
  }

  function appendNoUser (message) {
    const html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${message}</p>
                </div>`
    user_list.append(html);
  }

  function buildAddUserHTML (name, id) {
    const html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }
  let userIds = []; // 検索から除くuser
  const user_list = $('#user-search-result'); // 検索結果表示欄
  $('.js-chat-member').each(function(index, el) {
    userIds.push(el.getAttribute('id'));
  });

  $('#user-search-field').on('input', function(e) {
    e.preventDefault();
    user_list.empty();
    // 入力内容を取得
    const input = $('#user-search-field').val();
    if (input.length == 0) {
      return
    };
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input,
              user_ids: userIds },
    })
    .done(function(users) {
      // 検索結果を空欄にする
      if (users.length !== 0) {
        users.forEach(function(user) {
          // 検索結果にユーザーを追加する関数
          appendUser(user);
        })
      } else {
        appendNoUser('一致するユーザーが見つかりません');
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });

  $(document).on('click', '.chat-group-user__btn--add', function() {
    const userName = $(this).attr('data-user-name');
    const userId   = $(this).attr('data-user-id');

    userIds.push(userId);
    $(this).parent().remove();
    const html = buildAddUserHTML(userName, userId);
    $('.js-add-user').append(html);
  })

  $(document).on('click', '.js-remove-btn', function() {
    const removedUserId = $(this).siblings('input').val();
    userIds = userIds.filter(id => id != removedUserId);
    $(this).parent().remove();
  })
});