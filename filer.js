const readXlsxFile = require('read-excel-file/node');

async function read_file(file_to_read) {
    let headers = [];
    let body = [];
    let data = [];
    let main_data = [];
    let data2 = [];
    main_data = await readXlsxFile(file_to_read).then((rows) => {
        console.log("List of variables: ")
        for (let i = 0; i < rows[0].length; i++) {
            headers.push(rows[0][i])
            console.log("{{"+ rows[0][i] +"}}")
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
        for(let i = 1; i < rows.length; i++) {
            obj = []
            for(let j = 0; j < rows[i].length; j++) {
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

module.exports.read_file = read_file
