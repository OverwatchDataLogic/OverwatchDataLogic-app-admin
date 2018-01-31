import AV from 'leancloud-storage'

// 创建英雄
export function cerateHero(payload, team) {
  const Heroes = new AV.Object('Heroes')
  
  return Heroes.save().then(function(result) {
    return result.toJSON()
  })
}
