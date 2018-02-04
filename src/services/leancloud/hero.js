import AV from 'leancloud-storage'
import { getCurrentUser } from './user'

// 创建英雄
export function createHeroes(payload) {
  const user = getCurrentUser()

  const heroes = new AV.Object('Heroes')

  for (let key of Object.keys(payload)) {
    heroes.set(key, payload[key])
  }

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(user, true)

  heroes.setACL(acl)

  return heroes.save().then(function(result) {
    return result.toJSON()
  })
}

export function getHeroes() {
  let list = []
  const query = new AV.Query('Heroes')
  return query.find().then(function(result) {
    result.forEach(item => {
      const res = item.toJSON()
      list.push(res)
    })
    return { list }
  })
}

export function getHero(playload) {
  var query = new AV.Query('Heroes')
  query.get(playload.objectId).then(function(result) {
    return result.toJSON()
  })
}

export function updateHeroes(payload) {
  const heroes = AV.Object.createWithoutData('Heroes', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      heroes.set(key, payload[key])
    }
  }

  return heroes.save().then(function(result) {
    return result.toJSON()
  })
}

export function removeHeroes(payload) {
  var heroes = AV.Object.createWithoutData('Heroes', payload.objectId)
  return heroes.destroy().then(function(success) {
    return success.toJSON()
  })
}
