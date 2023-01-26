const read_file = require('./filer').read_file;


async function send_msg(message, file) {
    let data = await read_file(file);
    let reg;
    for (let i = 0; i < data.length; i++) {
        let t = message;
        for (let j = 0; j < data[i].length; j++) {
            reg = RegExp("{{" + data[i][j][0] + "}}", '\g')
            t = t.replace(reg, data[i][j][1])
        }
        console.log(t)
    }
}

module.exports.send_msg = send_msg



