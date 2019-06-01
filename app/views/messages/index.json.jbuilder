json.array! @new_messages do |message|
  json.id         message.id
  json.body       message.body
  json.image      message.image
  json.created_at message.created_at.to_s
  json.user_name  message.user.name
end
