'use strict'
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {getRecipes} from '../actions/recipeActions';
import Recipes from './recipes'
import UserModal from './interaction'

class RecipeBook extends React.Component{

  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} className="text-left">
            <h1 id="boxtitle">Recipe Box</h1>
            <Recipes />
          </Col>
          <UserModal editInfo="Add Recipe"/>
        </Row>
      </Grid>
    )
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
export default connect(mapStateToProps)(RecipeBook)
