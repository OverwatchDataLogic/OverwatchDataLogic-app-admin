import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import _ from 'lodash'
import {
  getSports,
  getSportById,
  createSports,
  updateSports,
  removeSports
} from '../services/api'

export default {
  namespace: 'sports',

  state: {
    default: {
      title: '',
      abbreviatedTitle: '',
      englishTitle: '',
      description: '',
      startDate: '2018-01-01',
      endDate: '2018-01-01',
      prize: 0,
      status: 'PENDING'
    },
    data: {
      currentItem: {},
      list: [],
      pagination: {}
    }
  },

  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getSports, payload)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *getById({ payload }, { call, put }) {
      const response = yield call(getSportById, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createSports, payload)
      yield put({
        type: 'createSuccess',
        payload: response
      })
      yield put(routerRedux.push('/sports/sport/list'))
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateSports, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
      yield put(routerRedux.push('/sports/sport/list'))
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeSports, payload)
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
        if (pathname.startsWith('/sports')) {
          const query = queryString.parse(search)
          if (pathname === '/sports/sport/list') {
            dispatch({ type: 'get', payload: query })
          }
        }
      })
    }
  }
}
