import axios from 'axios'

export  const loadTransactions = () => dispatch =>{
   axios.get('/api/transactions')
     .then(res =>{
         console.log(res.data)
         dispatch({
             type:'LOAD_TRANSACTIONS',
             payload:{
                 transactions:res.data
                }
         })
     })
     .catch(e => console.log(e))   
}


export const addNewTransaction = (transaction) => dispatch =>{
    console.log(transaction)
     axios.post('/api/transactions',transaction)
        .then(res=>{
           
            dispatch({
                type:'CREATE_TRANSACTION',
                payload:{
                    transaction:res.data
                }
            })
        })
        .catch(e=> console.log(e))
}


export const removeTransaction = (id)=> dispatch =>{

    axios.delete(`/api/transactions/${id}`)
       .then (res =>{
           console.log(res.data)
           dispatch({
               type:'REMOVE_TRANSACTION',
               payload:{
                   id:res.data._id
               }
           })
       })
       .catch(e=>{
           console.log(e)

       })
}


export const updateTransaction = (id,transaction) => dispatch =>{
    console.log(id,transaction)
    axios.post(`/api/transactions/${id}`,transaction,)
        .then(res =>{
           dispatch({
               type:'UPDATE_TRANSACTION',
               payload:{
                   transaction:res.data.transaction
               }
           })
        })
        .catch(e=> console.log(e.message))
}