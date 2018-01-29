import { stringify } from 'qs'
import request from '../utils/request'

export async function queryProjectNotice() {
  return request('/api/project/notice')
}

export async function queryActivities() {
  return request('/api/activities')
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`)
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete'
    }
  })
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post'
    }
  })
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params
  })
}

export async function fakeChartData() {
  return request('/api/fake_chart_data')
}

export async function queryTags() {
  return request('/api/tags')
}

export async function queryBasicProfile() {
  return request('/api/profile/basic')
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced')
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`)
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params
  })
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params
  })
}

export async function queryNotices() {
  return request('/api/notices')
}

export async function getSports(params) {
  return request(`/api/sports?${stringify(params)}`)
}

export async function getSportById(id) {
  return request(`/api/sports/${id}`)
}

export async function createSports(params) {
  return request('/api/sports', {
    method: 'POST',
    body: {
      ...params
    }
  })
}

export async function updateSports(params) {
  return request('/api/sports', {
    method: 'PUT',
    body: {
      ...params
    }
  })
}

export async function removeSports(id) {
  return request(`/api/sports/${id}`, {
    method: 'DELETE'
  })
}

export async function getPlayers(params) {
  return request(`/api/players?${stringify(params)}`)
}

export async function getPlayerById(id) {
  return request(`/api/players/${id}`)
}

export async function createPlayers(params) {
  return request('/api/players', {
    method: 'POST',
    body: {
      ...params
    }
  })
}

export async function updatePlayers(params) {
  return request('/api/players', {
    method: 'PUT',
    body: {
      ...params
    }
  })
}

export async function removePlayers(id) {
  return request(`/api/players/${id}`, {
    method: 'DELETE'
  })
}
