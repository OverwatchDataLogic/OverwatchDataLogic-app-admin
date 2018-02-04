import '@babel/polyfill'
import 'url-polyfill'
import dva from 'dva'

import createHistory from 'history/createHashHistory'
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';

import createLoading from 'dva-loading'
import 'moment/locale/zh-cn'
import FastClick from 'fastclick'
import AV from 'leancloud-storage'
import './rollbar'
import './index.less'

const appId = 'QkO22RcNjXOsGxOz9rdAVcJE-9Nh9j0Va'
const appKey = 'C8WTwwP4kyfsNkkMELTaVWJk'
AV.init({ appId, appKey })

// 1. Initialize
const app = dva({
  history: createHistory()
})

// 2. Plugins
app.use(createLoading())

// 3. Register global model
app.model(require('./models/global').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')

FastClick.attach(document.body)

export default app._store // eslint-disable-line
