import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')

  Route.get('/threads', 'ThreadsController.index').middleware('auth')
  Route.post('/threads', 'ThreadsController.store').middleware('auth')
  Route.get('/threads/:id', 'ThreadsController.show')
  Route.put('/threads/:id', 'ThreadsController.update').middleware('auth')
  Route.delete('/threads/:id', 'ThreadsController.destroy').middleware('auth')
}).prefix('/api')
