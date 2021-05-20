
import Modal from 'react-modal'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateTransaction} from '../../store/actions/transactionAction'


Modal.setAppElement('#root');


class UpdateTransaction extends Component {
    state={
          amount:0,
          note:''
    }

    componentDidMount (){
        this.setState({
            amount:this.props.transaction.amount,
            note:this.props.transaction.note,
        })
    }


    changeHandler = e =>{
        console.log('am changeHandler calling')
        this.setState({
            [e.target.name] :e.target.value
        })
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log('called form')
        this.props.updateTransaction(this.props.transaction._id,this.state)
       
        this.props.Close()
    }


    customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width:'500px'
        }

      }

    

    render() {
        console.log(this.state)
        let {amount,note} = this.state
        return (
            <Modal style={this.customStyles} isOpen={this.props.isOpen} onRequestClose={this.props.Close} >
                 
                 <h3>Create New Transaction</h3>

           <form onSubmit={this.submitHandler}>
                 < div className="form-group">
                  


                <label htmlFor = "amount" > Amount:
                
                </label> < input type="number" name="amount" id="amount" className='form-control'
                placeholder = "Enter Your password"
                value={amount} 
                
                onChange = {
                    this.changeHandler
                }
                />
                
                  </div> 

            

             < div className="form-group">
                
                <label htmlFor = "note" > Note:
                
                </label> < textarea  name="note" id="note" className='form-control'
                placeholder = "Enter Your note"
                value={note} 
                
                onChange = {
                    this.changeHandler
                }
                />
                
                  </div> 
     
                  <button className='btn btn-primary my-3' onClick={this.submitHandler }>Submit</button>


                  </form>

            </Modal>
        )
    }
}


export default connect(null,{updateTransaction})(UpdateTransaction)