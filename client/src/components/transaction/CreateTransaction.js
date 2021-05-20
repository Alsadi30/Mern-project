
import Modal from 'react-modal'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addNewTransaction} from '../../store/actions/transactionAction'


Modal.setAppElement('#root');


class CreateTransaction extends Component {
    state={
          amount:0,
          type:'',
          note:''
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
        this.props.addNewTransaction(this.state)
        this.setState({
            amount:0,
          type:'',
          note:''
        })
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
                
                <label htmlFor = "type" > Type
                
                </label> 

                <select className='form-control' onChange={this.changeHandler} name='type'>
                    <option >Select A Type</option>
                    <option value='income'>Income</option>
                    <option value='expense'>Expense</option>
   
                </select>
                
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


export default connect(null,{addNewTransaction})(CreateTransaction)