"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {FormControl, FormGroup, Modal, Button, ControlLabel} from 'react-bootstrap'
import {addRecipe,updateRecipe} from '../actions/recipeActions';
import {findDOMNode} from 'react-dom';

class UserModal extends React.Component{
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
  handleChange(){
    if(this.props.editInfo==="Add Recipe"){
        if(!findDOMNode(this.refs.recipe).value){
          this.close()
          return;
        }
        this.props.addRecipe([
          {
            name:findDOMNode(this.refs.recipe).value,
            ingredients:findDOMNode(this.refs.ingredients).value.split(",")
          }
        ])
        this.close()
    }
    else{
      this.props.updateRecipe(
        {
          _id:this.props.editInfo,
          ingredients:findDOMNode(this.refs.ingredients).value.split(",")
        }
      )
      this.close()
    }

  }
  restoreIngredients(){

    let focusRecipe = this.props.editInfo //for some reson this.props is not known inisde findindex call back
    let indexOfRecipe = this.props.recipes.findIndex(function(recipe){
      return (recipe._id===focusRecipe)
    })

    return this.props.recipes[indexOfRecipe].ingredients.join(',')
  }
  formRenderType(){
    //function returns different type of form render depending on addition of recipe
    //or editing recipe
    if(!this.state.show){return}
    if(this.props.editInfo!=="Add Recipe"){
      //use only one input line
      var formType= (
              <FormGroup controlId="formBasicText">
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  type="text"
                  ref="ingredients"
                  defaultValue={this.restoreIngredients()}
                />
                <FormControl.Feedback />
            </FormGroup>
          )
    }
    else{//for addition of recipe
      //use form with two input lines and give different ID's to identify which input
      //text is coming from
      var formType= (
              <div>
                <FormGroup controlId="addRecipeText">
                  <ControlLabel>New Recipe</ControlLabel>
                  <FormControl
                    type="text"
                    ref="recipe"
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="addIngridText">
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl
                    type="text"
                    ref="ingredients"
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </div>
          )
    }
    return formType;
  }
  render(){
    //set variables for edit or addition that are to be included in modal
    if(this.props.editInfo!=="Add Recipe"){
      var indxRecipe = this.props.recipes.findIndex((r)=>{
        return (r._id===this.props.editInfo)
      })

      var modalTitle= "Edit Ingredients For " + this.props.recipes[indxRecipe].name;
      var buttonTitle = "Update Recipe";
      var buttonType = "info";
      var openerButtonType = "info";
      var openerButtonSize = "sm";
    }
    else{
      var modalTitle= "Add A New Recipe ";
      var buttonTitle = "Add Recipe";
      var buttonType = "primary";
      var openerButtonType = "warning";
      var openerButtonSize = "large";
    }
    return(
      <div>
        <Button bsStyle={openerButtonType} bsSize={openerButtonSize} onClick={this.open.bind(this)}>{buttonTitle} </Button>
        <div className="modal-container">
            <Modal
              show={this.state.show}
              onHide={this.close.bind(this)}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">{modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.formRenderType()}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleChange.bind(this)} bsStyle={buttonType}>{buttonTitle}</Button><Button onClick={this.close.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          addRecipe:addRecipe,
          updateRecipe:updateRecipe
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(UserModal)
