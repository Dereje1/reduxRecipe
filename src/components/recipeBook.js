'use strict'
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {getRecipes} from '../actions/recipeActions';
import Recipes from './recipes'
import UserModal from './interaction'

class RecipeBook extends React.Component{
  componentDidMount(){
    this.props.getRecipes()
  }
  render(){
    if(this.props.recipes){//check if state is not empty
      return(
        <div  style={{"paddingBottom":"10px"}}>
          <Grid >
            <Row style={{"marginTop":"10px"}}>
              <Col xs={12} sm={12} md={12} className="text-left">
                <Recipes />
              </Col>
              <Col xs={12} sm={12} md={12}>
                <UserModal editInfo={"Add Recipe"}/>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }
    else{
      return(<div  style={{"backgroundColor":"black","paddingBottom":"10px"}}></div>)
    }
  }
}
function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          getRecipes:getRecipes
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(RecipeBook)
