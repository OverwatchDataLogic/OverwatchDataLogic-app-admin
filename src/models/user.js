import { getUsers, getCurrentUserToJSON } from '../services/leancloud/user'

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getUsers)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getCurrentUserToJSON)
      yield put({
        type: 'saveCurrentUser',
        payload: response
      })
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      }
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      }
    }
  }
}
