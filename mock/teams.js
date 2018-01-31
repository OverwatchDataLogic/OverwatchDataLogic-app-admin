import { getUrlParams } from './utils'
import uuidv4 from 'uuid/v4'
import _ from 'lodash'

let tableListDataSource = [
  {
    id: uuidv4(),
    name: 'Shanghai Dragon',
    abbreviatedTitle: 'SHD',
    homeLocation: 'Shanghai',
    accounts: [],
    primaryColor: 'red',
    secondaryColor: 'yellow',
    addressCounty: 'China',
    description: '这是一支队伍',
    isDissolved: false,
    createTime: '2017-1-1',
    match: '比赛经历',
    honour: '所获荣誉',
    playerList: [],
  },
  {
    id: uuidv4(),
    name: 'Seoul Dynasty',
    abbreviatedTitle: 'SOD',
    homeLocation: 'Seoul',
    accounts: [],
    primaryColor: 'red',
    secondaryColor: 'yellow',
    addressCounty: 'South Korea',
    description: '这是一支队伍',
    isDissolved: false,
    createTime: '2017-1-1',
    match: '比赛经历',
    honour: '所获荣誉',
    playerList: [],
  },
  {
    id: uuidv4(),
    name: 'Dallas Fuel',
    abbreviatedTitle: 'DLF',
    homeLocation: 'Dallas',
    accounts: [],
    primaryColor: 'red',
    secondaryColor: 'yellow',
    addressCounty: 'United States',
    description: '这是一支队伍',
    isDissolved: false,
    createTime: '2017-1-1',
    match: '比赛经历',
    honour: '所获荣誉',
    playerList: [],
  },
  {
    id: uuidv4(),
    name: 'Florida Mayhem',
    abbreviatedTitle: 'FLM',
    homeLocation: 'Miami-Orlando',
    accounts: [],
    primaryColor: 'red',
    secondaryColor: 'yellow',
    addressCounty: 'United States',
    description: '这是一支队伍',
    isDissolved: false,
    createTime: '2017-1-1',
    match: '比赛经历',
    honour: '所获荣誉',
    playerList: [],
  },
]

export function getTeams(req, res, u) {
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

export function getTeamById(req, res) {
  const { id } = req.params

  const result = tableListDataSource.filter(x => x.id === id)[0]

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function postTeams(req, res, b) {
  const body = (b && b.body) || req.body
  const {
    name,
    familyName,
    givenName,
    headshot,
    nationality,
    homeLocation,
    role
  } = body

  const result = {
    id: uuidv4(),
    name,
    familyName,
    givenName,
    headshot,
    nationality,
    homeLocation,
    role
  }

  tableListDataSource.unshift(result)

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function putTeams(req, res, b) {
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

export function deleteTeams(req, res) {
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
  getTeams,
  getTeamById,
  postTeams,
  putTeams,
  deleteTeams
}
