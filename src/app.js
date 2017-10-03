"use strict"
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
//modules for react
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
//main react component (RecipeBook)
import RecipeBook from './components/recipeBook'
//modules I made myself
import {recipeReducer} from './reducers/recipeReducers'
import {addRecipe,deleteRecipe,getRecipes} from './actions/recipeActions'

//store declaration
const middleware = applyMiddleware(logger)
const store = createStore(recipeReducer,middleware)

//allows you to provide/link the store , ie. redux states to the react component
render (
  <Provider store={store}>
    <RecipeBook />
  </Provider>,
  document.getElementById('app'))



/* test redux dispatch model
store.dispatch(addRecipe(
  [
    {
    name: "Potbelly Sandwich",
    ingredients:["Roast Beef Sandwich","Loaded Chilli","Strawberry MilkShake"]
    }
  ]
))

store.dispatch(deleteRecipe("Cheeseburger"))
store.dispatch(getRecipes())
*/
