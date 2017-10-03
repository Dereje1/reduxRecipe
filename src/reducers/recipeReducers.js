"use strict"
export function recipeReducer(state=defaultRecipes,action){
  switch (action.type) {
    case "GET_RECIPES":
      //must redeclare everything as brand new!!
      let allRecipes =  [...state.recipes]
      return {recipes: allRecipes};
      break;
    case "ADD_RECIPE":
      //must redeclare everything as brand new!!
      if(action.payload[0].name.trim()===""){return {recipes: [...state.recipes]}}
      let newRecipesObject = {recipes: [...state.recipes,...action.payload]}
      return newRecipesObject;
      break;
    case "DELETE_RECIPE":
      //must redeclare everything as brand new!!
      let recipeCopy =  [...state.recipes]
      let indexOfDeletion = recipeCopy.findIndex(function(recipe){
        return (recipe.name===action.payload)
      })
      let recipeRemoved = [...recipeCopy.slice(0,indexOfDeletion),...recipeCopy.slice(indexOfDeletion+1)]

      return (indexOfDeletion===-1) ? {recipes: recipeCopy} : {recipes: recipeRemoved};
      break;
    case "UPDATE_RECIPE":
      //must redeclare everything as brand new!!
      let recipeToBeUpdated =  [...state.recipes]
      let indexOfUpdate = recipeToBeUpdated.findIndex(function(recipe){
        return (recipe.name===action.payload.name)
      })
      let recipeUpdated = [...recipeToBeUpdated.slice(0,indexOfUpdate),action.payload,...recipeToBeUpdated.slice(indexOfUpdate+1)]

      return {recipes: recipeUpdated};
      break;
  }
  return state
}

const defaultRecipes = {
  recipes:[
    {
      name: "Frog Legs",
      ingredients:["beef","butter","pepper"]
    },
    {
      name: "Steak Burrito",
      ingredients:["fresh salsa","brown rice","strip steak","black beans"]
    },
    {
      name: "Cheeseburger",
      ingredients:["freshly ground chuck","American cheese","large	burger buns"]
    }
  ]
}
