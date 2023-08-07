module HeadersHelper
  def response_headers(user, token)
    response.headers['Uid'] = user.id
    response.headers['Authorization'] = "Bearer #{token}"
    response.headers['Client'] = 'stockify'
   end
end