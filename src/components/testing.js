import React from 'react'
import {FormControl, FormGroup, Modal, Button, ControlLabel} from 'react-bootstrap'
class Testmodal extends React.Component{
  constructor(props){
    super(props)
    //initialize modal state and assign params on open
    this.state={
      show:false
    }
  }
  open(){
    //when modal is opened note edit info coming from the props of this class as an array
    //of the ingredients and recipe name for active recipe
    this.setState({
      show:true
    })
  }
  close(){
    //when modal is closed reset back to original state
    this.setState({
      show: false
    });
  }
  render(){
    return(
      <div>
        <Button onClick={this.open.bind(this)}>buttonTitle </Button>
        <div className="modal-container">
            <Modal
              show={this.state.show}
              onHide={this.close.bind(this)}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">modalTitle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Modal contents!
              </Modal.Body>
              <Modal.Footer>
                <Button >do something</Button><Button onClick={this.close.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal>
        </div>
      </div>
    )
  }
}

export default Testmodal
