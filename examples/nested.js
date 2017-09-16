var wayfarer = require('../index')

var userRouter = wayfarer('err')
var repoRouter = wayfarer()
var commitRouter = wayfarer()

commitRouter.on('/commit/:hash', ({ hash, repo, user }) => console.log(user, repo, hash))

repoRouter.on('/:repo/', ({ repo, user }) => console.log(user, repo))
repoRouter.on('/:repo', commitRouter)

userRouter.on('/err', () => console.error('path not found'))
userRouter.on('/user/:user/', ({ user }) => console.log(user))
userRouter.on('/user/:user', repoRouter)

userRouter('/user/timoxley')
// => timoxley

userRouter('/user/timoxley/linklocal')
// => timoxley linklocal

userRouter('/user/timoxley/linklocal/commit/cda1eaa8')
// => timoxley linklocal cda1eaa8
