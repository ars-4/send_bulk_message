const read_file = require('./filer').read_file;
const twilio = require('twilio');
const conf = require('./configuration.json');
const fetch = require('node-fetch');


function send_wp_message(msg, mobile) {
    let api_key = conf.defaults.seemalive.api_key;
    let url = `https://operator.apiwhatzapp.com/single.php?recipient=${mobile}&apikey=${api_key}&text=${msg}`
    fetch(url);
}


function send_twilio_message(msg) {
    const accountSid = conf.defaults.twilio.ssid; // Your Account SID from www.twilio.com/console
    const authToken = conf.defaults.twilio.token; // Your Auth Token from www.twilio.com/console
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: msg,
            to: '+923054307983', // Text this number
            from: '+1 616 344 9405', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}

async function send_msg(message, file, type) {
    let message_data = [];
    let data = await read_file(file);
    let reg;
    for (let i = 0; i < data.length; i++) {
        let msg = message;
        let mobile = "";
        for (let j = 0; j < data[i].length; j++) {
            if(data[i][j][0] === 'mobile') {
                mobile = data[i][j][1]
            }
            reg = RegExp("{{" + data[i][j][0] + "}}", '\g')
            msg = msg.replace(reg, data[i][j][1])
        }
        if(type == 'twilio') {
            message_data.push(msg)
            send_twilio_message(msg)
        }
        else if(type == 'wp') {
            message_data.push(msg)
            send_wp_message(msg, mobile)
        }
        else {
            console.log("No such type")
            break;
        }
    }
    return message_data;
}

module.exports.send_msg = send_msg



