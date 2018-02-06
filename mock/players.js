import { getUrlParams } from './utils'
import uuidv1 from 'uuid/v1'
import _ from 'lodash'

let tableListDataSource = [
  {
    id: uuidv1(),
    name: 'Bunny',
    familyName: 'Chae',
    givenName: 'Jun-Hyeok',
    avatar:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/8VVBZ6TJQZL41512770127850.png',
    nationality: 'KR',
    homeLocation: 'Suwon',
    level: 'owl',
    role: 'offense',
    heroes: [],
    accounts: [],
    accountsType: [],
    accountsValue: []
  },
  {
    id: uuidv1(),
    name: 'Miro',
    familyName: 'Gong',
    givenName: 'Jin-Hyuk',
    avatar:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/LTXC1UP8RPNW1512770128083.png',
    nationality: 'KR',
    homeLocation: 'DaeJeon',
    level: 'owl',
    role: 'tank',
    heroes: [],
    accounts: [],
    accountsType: [],
    accountsValue: []
  },
  {
    id: uuidv1(),
    name: 'ZUNBA',
    familyName: 'Kim',
    givenName: 'Joon-Hyeok',
    avatar:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/1W9Y36BABS5S1512770128543.png',
    nationality: 'KR',
    homeLocation: 'Boryung',
    level: 'owl',
    role: 'flex',
    heroes: [],
    accounts: [],
    accountsType: [],
    accountsValue: []
  },
  {
    id: uuidv1(),
    name: 'Munchkin',
    familyName: 'Byun',
    givenName: 'Sang-Beom',
    avatar:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/EXGQNIWZDGSD1512770128109.png',
    nationality: 'KR',
    homeLocation: 'Seoul',
    level: 'owl',
    role: 'offense',
    heroes: [],
    accounts: [],
    accountsType: [],
    accountsValue: []
  }
]

export function getPlayers(req, res, u) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url // eslint-disable-line
  }

  const params = getUrlParams(url)

  let dataSource = tableListDataSource

  if (params.sorter) {
    const s = params.sorter.split('_')
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]]
      }
      return prev[s[0]] - next[s[0]]
    })
  }

  if (params.role) {
    const role = params.role.split(',')
    let filterDataSource = []
    role.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.role === s)
      )
    })
    dataSource = filterDataSource
  }

  if (params.level) {
    const level = params.level.split(',')
    let filterDataSource = []
    level.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.level === s)
      )
    })
    dataSource = filterDataSource
  }

  if (params.id) {
    dataSource = dataSource.filter(data => data.id.indexOf(params.id) > -1)
  }

  let pageSize = 10
  if (params.pageSize) {
    pageSize = params.pageSize * 1
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1
    }
  }

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function getPlayerById(req, res) {
  const { id } = req.params

  const result = tableListDataSource.filter(x => x.id === id)[0]

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function postPlayers(req, res, b) {
  const body = (b && b.body) || req.body
  const {
    name,
    familyName,
    givenName,
    avatar,
    nationality,
    homeLocation,
    level,
    role,
    heroes,
    accounts,
    accountsType,
    accountsValue
  } = body

  const result = {
    id: uuidv1(),
    name,
    familyName,
    givenName,
    avatar,
    nationality,
    homeLocation,
    level,
    role,
    heroes,
    accounts,
    accountsType,
    accountsValue
  }

  tableListDataSource.unshift(result)

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function putPlayers(req, res, b) {
  const body = (b && b.body) || req.body
  const { id } = body

  tableListDataSource.forEach(item => {
    if (item.id === id) {
      const data = Object.assign(item, body)
      return data
    } else {
      return item
    }
  })

  const result = tableListDataSource.filter(x => x.id === id)[0]

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function deletePlayers(req, res) {
  const { id } = req.params
  let result = []

  id.split(',').forEach(x => {
    const r = _.remove(tableListDataSource, i => i.id === x)
    result = result.concat(r)
  })

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export default {
  getPlayers,
  getPlayerById,
  postPlayers,
  putPlayers,
  deletePlayers
}
