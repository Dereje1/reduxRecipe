"use strict"
import axios from 'axios';
// POST A BOOK
export function getRecipes(){
  console.log("Getting Recipes from DB!!")
  return function(dispatch){
    axios.get("/recipes")
    .then(function(response){//if request is fullfilled proceed with dispatch
      dispatch({type:"GET_RECIPES",payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_RECIPE_REJECTED",payload:"Error Getting the Recipes!"})
    })
  }
  //  return {
  //      type:"GET_RECIPES"
  //  }
}
// POST A BOOK
export function addRecipe(recipe){
  return function(dispatch){
    axios.post("/recipes",recipe)
    .then(function(response){//if request is fullfilled proceed with dispatch
      dispatch({type:"ADD_RECIPE",payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"ADD_RECIPE_REJECTED",payload:"Error Adding Recipe!"})
    })
  }

  //  return {
  //      type:"ADD_RECIPE",
  //      payload: recipe
  //  }
}

// DELETE A BOOK
export function deleteRecipe(id){
  return function(dispatch){
    axios.delete("/recipes/"+id)
      .then(function(response){
        dispatch({type:"DELETE_RECIPE",payload:id})
      })
      .catch(function(err){
        dispatch({type:"DELETE_RECIPE_REJECTED",payload:"Unable to Delete Recipe from DB"})
      })
  }
  /*
    return {
       type:"DELETE_RECIPE",
       payload: name
   }
 */
}

// UPDATE A BOOK
export function updateRecipe(recipeToUpdate){
  return function(dispatch){
  axios.put("/recipes/"+recipeToUpdate._id,recipeToUpdate)
    .then(function(response){
      dispatch({type:"UPDATE_RECIPE",payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"UPDATE_RECIPE_REJECTED",payload:"Unable to Delete Recipe from DB"})
    })
  }
/*
   return {
     type:"UPDATE_RECIPE",
     payload: recipe
   }
*/
}
