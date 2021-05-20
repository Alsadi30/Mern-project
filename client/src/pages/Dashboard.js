import React, { Component } from 'react'
import {connect} from 'react-redux'
import CreateTransaction from '../components/transaction/CreateTransaction'
import UpdateTransaction from '../components/transaction/updateTransaction'
import {loadTransactions,removeTransaction} from '../store/actions/transactionAction'


class Dashboard extends Component {

    state= {
        isOpen:false,
        updateModal:false,
        id:'',
       
    }

   componentDidMount(){
       console.log('im callin again and again')
       this.props.loadTransactions()
   }

    isOpen =()=>{
        this.setState({
            isOpen:true
        })
    }


    Close =()=>{
        this.setState({
            isOpen:false
        })
    }


    modalOpen =(id)=>{
        console.log('im callin again and again mao')
        this.setState({
            updateModal:true,
            id
        })
    }

    modalClose =()=>{
        console.log('im callin again and again clo')
        this.setState({
            updateModal:false
        })
    }


    removeTrans = (e) =>{
         e.preventDefault()
         console.log(e.target.value)
         this.props.removeTransaction(e.target.value)
    }

    render() {

        let {auth,transactions} = this.props
        console.log(this.state)
        return (
            <div className='container offset-2 col-md-8 row text-center'>
                <h1 className='  btn-secondary  '>
                    Welcome {auth.user.name}
                </h1>
                <p className= 'btn-primary'>Your email is : {auth.user.email}</p>
                <ul>
                    <h1 className=''>Transactions</h1>

                    {transactions.length > 0 &&
                    transactions.map(transaction => {
                        return(   <li key={transaction._id}
                            className={ transaction.type==='income'?'btn-success my-2':'btn-danger my-2'}>


                                 <div className='p-2'>Type:{transaction.type}</div>

                                 <div  className='p-2'>Amount:{transaction.amount}</div>

                                 <button value={transaction._id} className='btn btn-danger m-2' onClick={this.removeTrans}>Remove</button>

                                 <button onClick={()=>this.modalOpen(transaction._id)} className='btn btn-warning m-2' > Update</button>

                                {this.state.id===transaction._id ?  <UpdateTransaction isOpen={this.state.updateModal} Close={this.modalClose} transaction={transaction} />:null
 } 
                            </li>)
                    })
                   }
                </ul>
                 
               <button className='btn btn-primary col-6 offset-3' onClick={this.isOpen}>Create A New Transaction</button>
              
               <CreateTransaction isOpen={this.state.isOpen} Close={this.Close}/>

            </div>
        )
    }
}


const mapStateToProps = state =>({
    auth:state.auth,
    transactions:state.transactions
})

export default connect(mapStateToProps,{loadTransactions,removeTransaction})(Dashboard) ;
