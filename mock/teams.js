import { getUrlParams } from './utils'
import uuidv1 from 'uuid/v1'
import _ from 'lodash'

let tableListDataSource = [
  {
    id: uuidv1(),
    name: '达拉斯燃料队',
    abbreviatedTitle: 'DAL',
    homeLocation: '德克萨斯州，达拉斯',
    primaryColor: '0c2340',
    secondaryColor: '0072ce',
    addressCountry: 'US',
    description: '达拉斯燃料队',
    logo:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/NO44N7DDJAPF1508792362936.png',
    icon:
      'https://bnetcmsus-a.akamaihd.net/cms/template_resource/YX6JZ6FR89LU1507822882865.svg',
    match: '比赛经历',
    honour: '所获荣誉',
    level: 'owl',
    accounts: [],
    accountsType: [],
    accountsValue: [],
    players: []
  },
  {
    id: uuidv1(),
    name: '费城融合队',
    abbreviatedTitle: 'PHI',
    homeLocation: '宾夕法尼亚州，费城',
    primaryColor: 'ff9e1b',
    secondaryColor: '000000',
    addressCountry: 'US',
    description: '费城融合队',
    logo:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/3JZTLCPH37QD1508792362853.png',
    icon:
      'https://bnetcmsus-a.akamaihd.net/cms/template_resource/LAKZ6R7QEG6S1507822883033.svg',
    match: '比赛经历',
    honour: '所获荣誉',
    accounts: [],
    accountsType: [],
    accountsValue: [],
    players: []
  },
  {
    id: uuidv1(),
    name: '休斯顿神枪手队',
    abbreviatedTitle: 'HOU',
    homeLocation: '德克萨斯州，休斯顿',
    primaryColor: '000000',
    secondaryColor: '97d700',
    addressCountry: 'US',
    description: '休斯顿神枪手队',
    logo:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/HLRHYU5MT9MD1508792362935.png',
    icon:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/UPM8U5QV3DDU1507858876250.svg',
    match: '比赛经历',
    honour: '所获荣誉',
    level: 'owl',
    accounts: [],
    accountsType: [],
    accountsValue: [],
    players: []
  },
  {
    id: uuidv1(),
    name: '波士顿崛起队',
    abbreviatedTitle: 'BOS',
    homeLocation: '马萨诸塞州，波士顿',
    primaryColor: '174b97',
    secondaryColor: 'f2df00',
    addressCountry: 'US',
    description: '波士顿崛起队',
    logo:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/43UINMGMA83X1513383982827.png',
    icon:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/W4FGQ24HKCB51513383982827.svg',
    match: '比赛经历',
    honour: '所获荣誉',
    level: 'owl',
    accounts: [],
    accountsType: [],
    accountsValue: [],
    players: []
  },
  {
    id: uuidv1(),
    name: '纽约九霄天擎队',
    abbreviatedTitle: 'BOS',
    homeLocation: '纽约州，纽约',
    primaryColor: '171c38',
    secondaryColor: '0f57ea',
    addressCountry: 'US',
    description: '纽约九霄天擎队',
    logo:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/9r/9RYLM8FICLJ01508818792450.png',
    icon:
      'https://bnetcmsus-a.akamaihd.net/cms/page_media/jz/JZHJUJ8QM1AP1508818097057.svg',
    match: '比赛经历',
    honour: '所获荣誉',
    level: 'owl',
    accounts: [],
    accountsType: [],
    accountsValue: [],
    players: []
  }
]

export function getTeams(req, res, u) {
  console.log(123)

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
    abbreviatedTitle,
    homeLocation,
    primaryColor,
    secondaryColor,
    addressCountry,
    description,
    logo,
    icon,
    match,
    honour,
    level,
    accounts,
    accountsType,
    accountsValue,
    players
  } = body

  const result = {
    id: uuidv1(),
    name,
    abbreviatedTitle,
    homeLocation,
    primaryColor,
    secondaryColor,
    addressCountry,
    description,
    logo,
    icon,
    match,
    honour,
    level,
    accounts,
    accountsType,
    accountsValue,
    players
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
