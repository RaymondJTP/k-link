// let dataTransaksi = require('./data/dataTransaction.json')
// let nomor = 1
// let dataOrder = require(`./data/dataOrder/${nomor}.json`)
// console.log(dataOrder);

const Controller = require('./controllers/controller.js')

const argv = process.argv.slice(2)
const command = argv[0]
const input = argv.slice(1)

switch (command) {
    case 'help':
      Controller.help()
      break;
    case 'transactionpoint':
      Controller.transactionpoint(+input)
      break;
    default:
      Controller.help()
      break;
  }