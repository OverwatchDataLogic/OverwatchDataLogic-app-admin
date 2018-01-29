import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import _ from 'lodash'
import {
  getPlayers,
  getPlayerById,
  createPlayers,
  updatePlayers,
  removePlayers
} from '../services/api'

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
      role: ''
    },
    data: {
      list: [],
      pagination: {}
    }
  },
  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getPlayers, payload)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *getById({ payload }, { call, put }) {
      const response = yield call(getPlayerById, payload)
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
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removePlayers, payload)
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
        if (pathname.startsWith('/players')) {
          const query = queryString.parse(search)
          if (pathname === '/players/player/list') {
            dispatch({ type: 'get', payload: query })
          }
        }
      })
    }
  }
}
