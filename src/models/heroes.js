import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import _ from 'lodash'
import {
  getHeroes,
  getHeroById,
  createHeroes,
  updateHeroes,
  removeHeroes
} from '../services/api'

export default {
  namespace: 'heroes',

  state: {
    default: {
      name: '',
      description: '',
      health: '',
      armour: '',
      shield: '',
      real_name: '',
      age: '',
      height: '',
      profession: '',
      affiliation: '',
      base_of_operations: '',
      difficulty: 1,
      role: ''
    },
    data: {
      list: [],
      pagination: {}
    }
  },
  effects: {
    *get({ payload }, { call, put }) {
      console.log(123)
      const response = yield call(getHeroes, payload)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *getById({ payload }, { call, put }) {
      const response = yield call(getHeroById, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createHeroes, payload)
      yield put({
        type: 'createSuccess',
        payload: response
      })
      yield put(routerRedux.push('/Heroes/hero/list'))
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateHeroes, payload)
      yield put({
        type: 'updateSuccess',
        payload: response
      })
      yield put(routerRedux.push('/Heroes/hero/list'))
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeHeroes, payload)
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
        if (pathname === '/heroes/hero/list') {
          dispatch({ type: 'get', payload: query })
        }
      })
    }
  }
}
