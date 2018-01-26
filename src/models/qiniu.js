import { queryUploadToken } from '../services/api'

export default {
  namespace: 'qiniu',

  state: {
    token: ''
  },

  effects: {
    * fetch (_, { call, put }) {
      const response = yield call(queryUploadToken)
      yield put({
        type: 'save',
        payload: response
      })
    }
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        token: action.payload
      }
    }
  }
}
