import {fastify} from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'upload-api'
})


app.listen({
  port: 3333,
}).then(() => {
  console.log("HTTP Server Running!")
})