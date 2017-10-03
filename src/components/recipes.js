import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Accordion, Panel, Button} from 'react-bootstrap'
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
          <Panel header={recipe.name} eventKey={recipe.name}>
          {/*React bootstrap panel*/}
            {/*Call ingredients listing class*/}
            <Ingredients ingrid={recipe.ingredients}/>
            {/*Delete bootstrap button with callbacl, must use arrow function to bind*/}
            <Button key={"Delete" + idx} onClick={()=>this.props.deleteRecipe(recipe.name)} className="btn btn-danger">Delete</Button>
            <UserModal editInfo={recipe.name}/>
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
