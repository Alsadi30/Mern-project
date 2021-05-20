

const transactionReducer = (state=[],action)=>{
    switch (action.type){
        case "LOAD_TRANSACTIONS":{
            return action.payload.transactions
        }
        case 'CREATE_TRANSACTION':{
            let transactions = [...state]
            transactions.unshift(action.payload.transaction)
            return transactions  
        }
        case 'REMOVE_TRANSACTION':{
            let transactions = [...state]
            return transactions.filter(tran=>tran._id !== action.payload.id)
        }
        case 'UPDATE_TRANSACTION':{
            let transactions  = [...state]
            return transactions.map(tran =>{
                if(tran._id===action.payload.transaction._id){
                    return action.payload.transaction
                }

                return tran
            })
        }
        default : return state
    }
}




export default transactionReducer;