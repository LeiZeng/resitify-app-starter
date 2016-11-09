import restify from 'restify'
import sessions from 'client-sessions'

import './middlewares/db'
import passport, { login } from './middlewares/passport-local'

const server = restify.createServer()
const port = 1108

server.pre(restify.pre.userAgentConnection())
server.use(restify.bodyParser())
server.use(restify.queryParser())

server.use(sessions({
    // cookie name dictates the key name added to the request object
    cookieName: 'session-wechat-app-server',
    // should be a large unguessable string
    secret: 'blablalala',
    // how long the session will stay valid in ms
    duration: 365 * 24 * 60 * 60 * 1000
}))

passport(server)
if (process.env.NODE_ENV === 'development') {
  require('./middlewares/swagger')(server)
}

restify.defaultResponseHeaders = function(data) {
    this.header('Access-Control-Allow-Origin', '*')
}

server.post(/^\/login/, login)

server.listen(port)

console.log(`server start at ${port}`)
