"use strict"
// POST A BOOK
export function getRecipes(){
   return {
       type:"GET_RECIPES"
   }
}
// POST A BOOK
export function addRecipe(recipe){
   return {
       type:"ADD_RECIPE",
       payload: recipe
   }
}

// DELETE A BOOK
export function deleteRecipe(name){
    return {
       type:"DELETE_RECIPE",
       payload: name
   }
}

// UPDATE A BOOK
export function updateRecipe(recipe){
   return {
     type:"UPDATE_RECIPE",
     payload: recipe
   }
}
