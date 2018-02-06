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
      const teamPlayerMap = new AV.Object('TeamPlayerMap')
      const player = AV.Object.createWithoutData('Players', item)
      teamPlayerMap.set('player', player)
      teamPlayerMap.set('team', result)
      teamPlayerMap.save()
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
    if (payload.level) {
      const level = payload.level.split(',')
      let filterDataSource = []
      level.forEach(s => {
        filterDataSource = filterDataSource.concat(
          [...list].filter(data => data.level === s)
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

export function getTeam(playload) {
  var query = new AV.Query('Team')
  query.get(playload.objectId).then(function(result) {
    return result.toJSON()
  })
}

export function updateTeams(payload) {
  const team = AV.Object.createWithoutData('Teams', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      team.set(key, payload[key])
    }
  }

  return team.save().then(function(result) {
    const query = new AV.Query('TeamPlayerMap')
    query.equalTo('team', team)
    query.find().then(function(result) {
      AV.Object.destroyAll(result).then(() => {
        payload.players.forEach(item => {
          const teamPlayerMap = new AV.Object('TeamPlayerMap')
          const player = AV.Object.createWithoutData('Players', item)
          teamPlayerMap.set('player', player)
          teamPlayerMap.set('team', team)
          teamPlayerMap.save()
        })
        return result.toJSON()
      })
    })
  })
}

export function removeTeams(payload) {
  var team = AV.Object.createWithoutData('Teams', payload.objectId)
  return team.destroy().then(function(success) {
    const query = new AV.Query('TeamPlayerMap')
    query.equalTo('team', team)
    query.find().then(function(result) {
      AV.Object.destroyAll(result)
    })
    return success.toJSON()
  })
}

export function removeAllTeams(payload) {
  const teams = AV.Object.createWithoutData('Teams', payload.objectId)
  return teams.destroy().then(function(success) {
    payload.objectId.forEach(item => {
      const team = AV.Object.createWithoutData('Teams', item)
      team.destroy().then(function(success) {
        const query = new AV.Query('TeamPlayerMap')
        query.equalTo('team', team)
        query.find().then(function(result) {
          AV.Object.destroyAll(result)
        })
      })
    })
    return success.toJSON()
  })
}
