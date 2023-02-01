const writeXlsxFile = require('write-excel-file/node')

let row_1 = [{
    value: 'Name',
    fontWeight: 'bold'
}]

let test_row = [
    [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4]
    ]
]

for(let i = 0; i < test_row.length; i++) {
    for(let j = 0; j < test_row[i].length; j++) {
        test_row[i][j][1]
    }
}

data = [
    row_1,
    [{value:'John Smithson'}]
]

writeXlsxFile(data, {
    filePath: './resources/uploads/file.xlsx'
}).then(() => {
    console.log("Done")
})
