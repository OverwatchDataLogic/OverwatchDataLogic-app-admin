import AV from 'leancloud-storage'

// 发送验证码
export function requestSmsCode(payload) {
  const { phone } = payload
  return AV.Cloud.requestSmsCode(phone).then(function(result) {
    return result.toJSON()
  })
}

