const server = require('./server');
const filer = require('./filer');

// server.listen(3000, () => {
//   console.log("App Listening on port 3000")
// })

let x = filer.read_file('./uploads/students.xlsx')

console.log(x)
