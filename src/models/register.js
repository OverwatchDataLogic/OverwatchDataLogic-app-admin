import { register } from '../services/leancloud/user'

export default {
  namespace: 'register',

  state: {
    status: undefined,
    error: undefined
  },

  effects: {
    *submit({ payload }, { call, put }) {
      try {
        const response = yield call(register, payload)
        yield put({
          type: 'registerSuccess',
          payload: response
        })
      } catch (error) {
        yield put({
          type: 'registerFailed',
          payload: error
        })
      }
    }
  },

  reducers: {
    registerSuccess(state, { payload }) {
      return {
        ...state,
        status: 'ok'
      }
    },
    registerFailed(state, { payload }) {
      return {
        ...state,
        status: 'error',
        error: payload.rawMessage
      }
    }
  }
}
