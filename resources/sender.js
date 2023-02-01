const filer = require('./filer');
const twilio = require('twilio');
const fetch = require('node-fetch');




async function send_msg(message, file, type, country) {
    let message_data = [];
    let data = await filer.read_file(file);
    let reg;
    for (let i = 0; i < data.length; i++) {
        let msg = message;
        let mobile = "";
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j][0] === 'mobile') {
                // mobile = data[i][j][1]
                let string_mob = String(data[i][j][1])
                if(string_mob.includes('(')) {
                    data[i][j][1] = string_mob.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
                 }
                switch(country) {
                    case 'none':
                        data[i][j][1] = data[i][j][1]
                        mobile = data[i][j][1]
                        break;
                    
                    case 'us':
                        data[i][j][1] = "+1" + String(data[i][j][1])
                        mobile = data[i][j][1]
                        break;
                }
            }
            reg = RegExp("{{" + data[i][j][0] + "}}", '\g')
            msg = msg.replace(reg, data[i][j][1])
        }
        if (mobile === "" || mobile.length < 8) {
            message_data.push("Invalid or Empty mobile")
        }
        else {
            if (type == 'twilio') {
                message_data.push(msg)
                send_twilio_message(msg)
            }
            else if (type == 'seemalive') {
                message_data.push(msg)
                send_wp_message(msg, mobile)
            }
            else if(type == 'write_file') {
                message_data.push(msg)
            }
            else if(type == 'test') {
                message_data.push(msg)
            }
            else {
                console.log("No such type")
                break;
            }
        }
    }
    filer.write_file(data, message_data)
    return message_data;
}


function send_wp_message(msg, mobile) {
    let api_key = process.env.seemalive_api_key;
    let url = `https://operator.apiwhatzapp.com/single.php?recipient=${mobile}&apikey=${api_key}&text=${msg}`
    fetch(url);
}


function send_twilio_message(msg) {
    const accountSid = process.env.twilio_secret; // Your Account SID from www.twilio.com/console
    const authToken = process.env.twilio_token; // Your Auth Token from www.twilio.com/console
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: msg,
            to: '+923054307983', // Text this number
            from: process.env.twilio_number, // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}


module.exports.send_msg = send_msg



