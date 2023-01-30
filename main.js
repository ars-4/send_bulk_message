const server = require('./resources/server');
const conf = require('./resources/configuration.json');

process.env.test = "String";

console.log(process.env.test)

let port = conf.defaults.port
server.listen(port, () => {
  console.log(`App Listening on port ${port}`)
})

