import AV from 'leancloud-storage'
import { getCurrentUser } from './user'

// 创建选手
export function createPlayers(payload) {
  const user = getCurrentUser()

  const players = new AV.Object('Players')

  for (let key of Object.keys(payload)) {
    players.set(key, payload[key])
  }

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(user, true)
  players.setACL(acl)

  return players.save().then(function(result) {
    return result.toJSON()
  })
}

export function getPlayers(payload) {
  let list = []
  let { currentPage, pageSize } = payload
  pageSize = pageSize || 10
  currentPage = currentPage || 1
  const query = new AV.Query('Players')
  query.limit(pageSize)
  query.skip(pageSize * (currentPage - 1))
  return query.find().then(function(result) {
    result.forEach(item => {
      const res = item.toJSON()
      list.push(res)
    })
    if (payload.role) {
      const role = payload.role.split(',')
      let filterDataSource = []
      role.forEach(s => {
        filterDataSource = filterDataSource.concat(
          [...list].filter(data => data.role === s)
        )
      })
      list = filterDataSource
    }
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

export function getPlayer(playload) {
  var query = new AV.Query('Player')
  query.get(playload.objectId).then(function(result) {
    return result.toJSON()
  })
}

export function updatePlayers(payload) {
  const players = AV.Object.createWithoutData('Players', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      players.set(key, payload[key])
    }
  }

  return players.save().then(function(result) {
    return result.toJSON()
  })
}

export function removePlayers(payload) {
  var players = AV.Object.createWithoutData('Players', payload.objectId)
  return players.destroy().then(function(success) {
    return success.toJSON()
  })
}
