import request from '../utils/request'
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const getSmsCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'get'

  })
}
export const getUserInof = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'get'

  })
}
export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'

  })
}
