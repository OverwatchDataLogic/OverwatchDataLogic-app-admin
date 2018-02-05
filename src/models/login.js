import { routerRedux } from 'dva/router'
import { login, logout } from '../services/leancloud/user'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(login, payload)
        yield put({
          type: 'loginSuccess'
        })
        yield put({
          type: 'user/saveCurrentUser',
          payload: response
        })
        reloadAuthorized()
        yield put(routerRedux.push('/'))
      } catch (error) {
        yield put({
          type: 'loginFailed',
          payload: error
        })
      }
    },
    *logout(_, { call, put, select }) {
      yield call(logout)
      const urlParams = new URL(window.location.href)
      const pathname = yield select(state => state.routing.location.pathname)
      urlParams.searchParams.set('redirect', pathname)
      window.history.replaceState(null, 'login', urlParams.href)
      yield put({
        type: 'logoutSuccess'
      })
      reloadAuthorized()
      yield put(routerRedux.push('/user/login'))
    }
  },

  reducers: {
    loginSuccess(state, { payload }) {
      setAuthority('admin')
      return {
        ...state,
        status: 'ok',
        type: 'account',
        currentAuthority: 'admin'
      }
    },
    loginFailed(state, { payload }) {
      setAuthority('guest')
      return {
        ...state,
        status: 'error',
        error: payload.rawMessage,
        type: 'account',
        currentAuthority: 'guest'
      }
    },
    logoutSuccess(state) {
      setAuthority('guest')
      return {
        ...state,
        user: null,
        status: 'error',
        currentAuthority: 'guest'
      }
    }
  }
}
