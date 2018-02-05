import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import _ from 'lodash'
import {
  getPlayers,
  getAllPlayers,
  getPlayer,
  createPlayers,
  updatePlayers,
  removePlayers,
  removeAllPlayers
} from '../services/leancloud/player'

export default {
  namespace: 'players',

  state: {
    default: {
      name: '',
      familyName: '',
      givenName: '',
      headshot: '',
      nationality: '',
      homeLocation: '',
      role: 'offense',
      heroes: [],
      accounts: [],
      accountsType: [],
      accountsValue: []
    },
    data: {
      list: [],
      pagination: {}
    },
    all: []
  },
  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getPlayers, payload)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *getAll(_, { call, put }) {
      const response = yield call(getAllPlayers)
      yield put({
        type: 'saveAll',
        payload: response
      })
    },
    *getById({ payload }, { call, put }) {
      const response = yield call(getPlayer, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createPlayers, payload)
      yield put({
        type: 'createSuccess',
        payload: response
      })
      yield put(routerRedux.push('/players/player/list'))
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updatePlayers, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
      yield put(routerRedux.push('/players/player/list'))
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removePlayers, payload)
      yield put({
        type: 'removeSuccess',
        payload: response
      })
    },
    *removeAll({ payload }, { call, put }) {
      const response = yield call(removeAllPlayers, payload)
      yield put({
        type: 'removeAllSuccess',
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
    saveAll(state, action) {
      return {
        ...state,
        all: action.payload
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
        if (item.objectId === action.payload.objectId) {
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
      const list = state.data.list.filter(
        x => x.objectId !== action.payload.objectId
      )
      return {
        ...state,
        data: {
          ...state.data,
          list: list
        }
      }
    },
    removeAllSuccess(state, action) {
      const l = []
      action.payload.objectId.forEach(item => {
        const list = state.data.list.filter(x => x.objectId !== item)
        l.concat(list)
      })
      const list = _.xor(l)
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
        if (pathname === '/players/player/list') {
          dispatch({ type: 'get', payload: query })
        }
      })
    }
  }
}
