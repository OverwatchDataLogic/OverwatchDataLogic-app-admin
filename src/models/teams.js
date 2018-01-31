import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import _ from 'lodash'
import {
  getTeams,
  getTeamById,
  createTeams,
  updateTeams,
  removeTeams
} from '../services/api'

export default {
  namespace: 'teams',

  state: {
    default: {
      //队伍名
      name: '',
      //队伍简称
      abbreviatedTitle: '',
      //队伍所在城市
      homeLocation: '',
      //社交网站账号
      accounts: [],
      //主要色调
      primaryColor: '',
      //次要色调
      secondaryColor: '',
      //国家
      addressCountry: '',
      //队伍描述
      description: '',
      //是否解散
      isDissolved: false,
      //解散时间
      dissolvedTime: null,
      //比赛经历
      match: '',
      //成立时间
      createTime: '',
      //获得荣誉
      honour: '',
      //选手列表
      playerList: [],
    },
    data: {
      currentItem: {},
      list: [],
      pagination: {}
    }
  },

  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getTeams, payload)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *getById({ payload }, { call, put }) {
      const response = yield call(getTeamById, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createTeams, payload)
      yield put({
        type: 'createSuccess',
        payload: response
      })
      yield put(routerRedux.push('/teams/team/list'))
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateTeams, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
      yield put(routerRedux.push('/teams/team/list'))
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTeams, payload)
      yield put({
        type: 'removeSuccess',
        payload: response
      })
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      }
    },
    createSuccess(state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          list: [...state.data.list, action.payload]
        }
      }
    },
    updateSuccess(state, action) {
      const list = state.data.list.map(item => {
        if (item.id === action.payload.id) {
          return Object.assign(item, action.payload)
        } else {
          return item
        }
      })
      return {
        ...state,
        data: {
          ...state.data,
          list: list
        }
      }
    },
    removeSuccess(state, action) {
      const list = _.xorBy(state.data.list, JSON.parse(action.payload), 'id')
      return {
        ...state,
        data: {
          ...state.data,
          list: list
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search)
        if (pathname === '/teams/team/list') {
          dispatch({ type: 'get', payload: query })
        }
      })
    }
  }
}
