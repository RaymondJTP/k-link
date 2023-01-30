

class Controller{
    static help(){
        console.log('node app.js');
        console.log('node app.js help');
        console.log('node app.js transactionpoint <nomor_order>');
      }

    static transactionpoint(input){
        try {
            
            var dataTransaksi = require('../data/dataTransaction.json')
            let dataOrder = require(`../data/dataOrder/${input}.json`)
            if(!dataOrder) throw({message : `Tidak ada data untuk order ${dataOrder}`})
            
            const countTotalAmountTransactionAndPoints = (dataOrder) =>{
                let totalAmountTransaction = 0
                let totalPoints = 0
                let totalItems
    
                
                for(let i = 0; i < dataTransaksi.length;i++){
                    if(dataTransaksi[i].user === dataOrder.user) totalAmountTransaction += dataTransaksi[i].total_amount_transaction
                }
    
                if(totalAmountTransaction > 40000000){
                    totalPoints = (totalAmountTransaction/10000) * 1.4
                }else if(totalAmountTransaction > 30000000){
                    totalPoints = (totalAmountTransaction/10000) * 1.3
                }else if(totalAmountTransaction > 20000000){
                    totalPoints = (totalAmountTransaction/10000) * 1.2
                }else if(totalAmountTransaction > 10000000){
                    totalPoints = (totalAmountTransaction/10000) * 1.1
                }else if(totalAmountTransaction > 1000000){
                    totalPoints = (totalAmountTransaction/10000) * 1.05
                }else{
                    totalPoints = totalAmountTransaction/1000
                }
    
                return {
                    totalAmountTransaction,
                    totalPoints : Math.ceil(totalPoints),
                    totalItems : dataOrder.products.length
                }
            }
            console.log(countTotalAmountTransactionAndPoints(dataOrder));
        } catch (err) {
            console.log(err.message);
        }

    }
}

module.exports = Controller