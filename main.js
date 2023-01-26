const server = require('./server');
const conf = require('./configuration.json');


let port = conf.defaults.port
server.listen(port, () => {
  console.log(`App Listening on port ${port}`)
})

