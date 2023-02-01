const server = require('./resources/server');
const conf = require('./resources/configuration.json');


process.env.port = conf.defaults.port || 3000;
process.env.seemalive_api_key = conf.defaults.seemalive.api_key
process.env.twilio_secret = conf.defaults.twilio.secret;
process.env.twilio_token = conf.defaults.twilio.token;
process.env.twilio_number = conf.defaults.twilio.number;


let port = process.env.port;
server.listen(port, () => {
  console.log(`App Listening on port ${port}`)
})

