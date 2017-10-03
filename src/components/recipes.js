import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Accordion, Panel, Button,ButtonToolbar} from 'react-bootstrap'
import {deleteRecipe} from '../actions/recipeActions';
import Ingredients from './ingredients'
import UserModal from './interaction'

class Recipes extends React.Component{
  handleRecipeDelete(e){
    this.props.deleteRecipe(e)
  }
  listRecipes(){
    let allRecipes = this.props.recipes.map((recipe,idx)=>{
      return(
        //Components to be returned for each recipe
        <Accordion key={idx}>
        {/*React bootstrap accordiion*/}
          <Panel header={recipe.name} eventKey={recipe.name} style={{"cursor":"pointer"}}>
          {/*React bootstrap panel*/}
            {/*Call ingredients listing class*/}
            <Ingredients ingrid={recipe.ingredients}/>
            {/*Delete bootstrap button with callbacl, must use arrow function to bind*/}
            <ButtonToolbar>
              <Button key={"Delete" + idx} bsSize="sm" onClick={()=>this.props.deleteRecipe(recipe.name)} className="btn btn-danger">Delete</Button>
              <div style={{"display":"inline-flex","marginLeft":"5px"}}>
                <UserModal editInfo={recipe.name}/>
              </div>
            </ButtonToolbar>
          </Panel>
        </Accordion>
      )
    })
    return allRecipes
  }
  render(){

    return <div>{this.listRecipes()}</div>
  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          deleteRecipe:deleteRecipe
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Recipes)
