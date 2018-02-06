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
    payload.heroes.forEach(item => {
      const playerHeroMap = new AV.Object('PlayerHeroMap')
      const hero = AV.Object.createWithoutData('Heroes', item)
      playerHeroMap.set('hero', hero)
      playerHeroMap.set('player', result)
      playerHeroMap.save()
    })
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

export function getPlayersWithHeros(payload) {}

export function getPlayer(playload) {
  var query = new AV.Query('Player')
  query.get(playload.objectId).then(function(result) {
    return result.toJSON()
  })
}

export function updatePlayers(payload) {
  const player = AV.Object.createWithoutData('Players', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      player.set(key, payload[key])
    }
  }

  return player.save().then(function(result) {
    const query = new AV.Query('PlayerHeroMap')
    query.equalTo('player', player)
    query.find().then(function(result) {
      AV.Object.destroyAll(result).then(() => {
        payload.heroes.forEach(item => {
          const playerHeroMap = new AV.Object('PlayerHeroMap')
          const hero = AV.Object.createWithoutData('Heroes', item)
          playerHeroMap.set('hero', hero)
          playerHeroMap.set('player', player)
          playerHeroMap.save()
        })
        return result.toJSON()
      })
    })
  })
}

export function removePlayers(payload) {
  const player = AV.Object.createWithoutData('Players', payload.objectId)
  return player.destroy().then(function(success) {
    const query = new AV.Query('PlayerHeroMap')
    query.equalTo('player', player)
    query.find().then(function(result) {
      AV.Object.destroyAll(result)
    })
    return success.toJSON()
  })
}

export function removeAllPlayers(payload) {
  const players = AV.Object.createWithoutData('Players', payload.objectId)
  return players.destroy().then(function(success) {
    payload.objectId.forEach(item => {
      const player = AV.Object.createWithoutData('Players', item)
      player.destroy().then(function(success) {
        const query = new AV.Query('PlayerHeroMap')
        query.equalTo('player', player)
        query.find().then(function(result) {
          AV.Object.destroyAll(result)
        })
      })
    })
    return success.toJSON()
  })
}
