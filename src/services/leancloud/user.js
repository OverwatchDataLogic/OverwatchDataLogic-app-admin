import AV from 'leancloud-storage'
import { getAvatar } from '../../utils/avatar'

// 用户名和密码注册
export function register(payload) {
  const { username, password, email } = payload
  const avatar = getAvatar()
  const user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  user.set('avatar', avatar)
  return user.signUp().then(function(result) {
    return result.toJSON()
  })
}

// 手机号码注册
export function signUpBySmsCode(payload) {
  const { phone, code } = payload
  return AV.User.signUpOrlogInWithMobilePhone(phone, code)
}

// 第三方账号登录
export function signUpOrlogInWithAuthData(payload) {}

// 用户名和密码登录
export function login(payload) {
  const { username, password } = payload
  return AV.User.logIn(username, password).then(function(result) {
    return result.toJSON()
  })
}

// 手机号和密码登录
export function loginWithMobilePhone(payload) {
  const { phone, password } = payload
  return AV.User.logInWithMobilePhone(phone, password)
}

// 手机号和验证码登录
export function requestLoginSmsCode(payload) {
  const { phone, code } = payload
  return AV.User.logInWithMobilePhoneSmsCode(phone, code)
}

// 当前用户
export function getCurrentUser() {
  return AV.User.current()
}

export function getCurrentUserToJSON() {
  return AV.User.current().toJSON()
}

export function getUsers() {
  
}

// 验证 SessionToken 是否在有效期内
export function isAuthenticated() {
  var currentUser = AV.User.current()
  return currentUser.isAuthenticated()
}

// 使用 SessionToken 登录
// 登录后可以调用 user.getSessionToken() 方法得到当前登录用户的 sessionToken
export function logInWithSessionToken(payload) {
  const { sessionToken } = payload
  return AV.User.become(sessionToken)
}

// 登出
export function logout() {
  return AV.User.logOut()
  // 现在的 currentUser 是 null 了
  // var currentUser = AV.User.current()
}

// 验证邮箱
export function requestEmailVerify(payload) {
  const { email } = payload
  return AV.User.requestEmailVerify(email).then(function(result) {
    return result
  })
}

// 邮箱重置密码
export function requestPasswordReset(payload) {
  const { email } = payload
  return AV.User.requestPasswordReset(email).then(function(result) {
    return result
  })
}

// 手机号码重置密码, 发送验证码
export function requestPasswordResetBySmsCode(payload) {
  const { phone } = payload
  return AV.User.requestPasswordResetBySmsCode(phone)
}

// 手机号码重置密码
export function resetPasswordBySmsCode(payload) {
  const { code, password } = payload
  return AV.User.resetPasswordBySmsCode(code, password)
}
