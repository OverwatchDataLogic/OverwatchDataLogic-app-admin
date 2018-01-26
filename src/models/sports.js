import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import pathToRegexp from 'path-to-regexp'
import {
  querySports,
  removeSports,
  createSports,
  updateSports
} from '../services/api'

export default {
  namespace: 'sports',

  state: {
    data: {
      currentItem: {},
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySports, payload)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createSports, payload)
      yield put({
        type: 'save',
        payload: response
      })
      yield put(routerRedux.push('/sports/sport/list'))
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateSports, payload)
      yield put({
        type: 'save',
        payload: response
      })
      yield put(routerRedux.push('/sports/sport/list'))
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeSports, payload)
      yield put({
        type: 'save',
        payload: response
      })
      if (callback) callback()
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname.startsWith('/sports')) {
          const query = queryString.parse(search)
          if (pathname === '/sports/sport/list') {
            dispatch({ type: 'fetch', payload: query })
          }
        }
      })
    }
  }
}
