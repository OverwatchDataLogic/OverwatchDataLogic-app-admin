import AV from 'leancloud-storage'
import { getCurrentUser } from './user'

// 创建选手
export function createTeams(payload) {
  const user = getCurrentUser()

  const teams = new AV.Object('Teams')

  for (let key of Object.keys(payload)) {
    teams.set(key, payload[key])
  }

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(user, true)
  teams.setACL(acl)

  return teams.save().then(function(result) {
    payload.players.forEach(item => {
      const player = AV.Object.createWithoutData('Players', item.id)
      player.set('team', result)
      player.save()
    })
    return result.toJSON()
  })
}

export function getTeams(payload) {
  let list = []
  let { currentPage, pageSize } = payload
  pageSize = pageSize || 10
  currentPage = currentPage || 1
  const query = new AV.Query('Teams')
  query.limit(pageSize)
  query.skip(pageSize * (currentPage - 1))
  return query.find().then(function(result) {
    result.forEach(item => {
      const res = item.toJSON()
      list.push(res)
    })
    const data = {
      list,
      pagination: {
        total: list.length,
        pageSize,
        current: currentPage
      }
    }
    return data
  })
}

export function getTeam(playload) {
  var query = new AV.Query('Team')
  query.get(playload.objectId).then(function(result) {
    return result.toJSON()
  })
}

export function updateTeams(payload) {
  const teams = AV.Object.createWithoutData('Teams', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      teams.set(key, payload[key])
    }
  }

  return teams.save().then(function(result) {
    payload.players.forEach(item => {
      const player = AV.Object.createWithoutData('Players', item.id)
      player.set('team', result)
      player.save()
    })
    return result.toJSON()
  })
}

export function removeTeams(payload) {
  var teams = AV.Object.createWithoutData('Teams', payload.objectId)
  return teams.destroy().then(function(success) {
    return success.toJSON()
  })
}
