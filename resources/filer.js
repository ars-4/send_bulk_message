const readXlsxFile = require('read-excel-file/node');
const writeXlsxFile = require('write-excel-file/node')

async function read_file(file_to_read) {
    let headers = [];
    let body = [];
    let data = [];
    let main_data = [];
    let data2 = [];
    main_data = await readXlsxFile(file_to_read).then((rows) => {
        for (let i = 0; i < rows[0].length; i++) {
            headers.push(rows[0][i])
        }
        for (let i = 0; i < headers.length; i++) {
            for (let j = 1; j < rows.length; j++) {
                body.push(rows[j][i])
            }
            data.push({
                'head': headers[i],
                'body': body
            })
            body = []
        }
        let obj = []
        let inner_array = []
        for (let i = 1; i < rows.length; i++) {
            obj = []
            for (let j = 0; j < rows[i].length; j++) {
                inner_array = []
                inner_array.push(rows[0][j])
                inner_array.push(rows[i][j])
                obj.push(inner_array)
            }
            data2.push(obj)
        }
        return data2;
    })
    return main_data
}

async function get_variables_from_file(file_to_read) {
    let headers = [];
    main_data = await readXlsxFile(file_to_read).then((rows) => {
        for (let i = 0; i < rows[0].length; i++) {
            headers.push(rows[0][i])
        }
    }).then(() => { return headers; })
    return main_data
}

async function write_file(data, messages) {
    let final_data = []
    let heads = []
    for (let i = 0; i < data[0].length; i++) {
        heads.push({ value: data[0][i][0] })
    }
    heads.push({value:"message"})
    final_data.push(heads)
    let inner_array = [];
    for (let i = 0; i < data.length; i++) {
        inner_array = [];
        for (let j = 0; j < data[i].length; j++) {
            inner_array.push({ value: data[i][j][1] })
        }
        inner_array.push({ value: messages[i] })
        final_data.push(inner_array)
    }
    write_actual_data(final_data)
}

function write_actual_data(data) {
    writeXlsxFile(data, {
        filePath: './resources/uploads/' + 'Output.xlsx'
    }).then(() => {
        console.log("File Written Succesfully -> Uploads/Output.xlsx")
    })
}

module.exports.read_file = read_file
module.exports.write_file = write_file
module.exports.get_variables_from_file = get_variables_from_file
