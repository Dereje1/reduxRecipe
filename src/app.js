"use strict"
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
//modules for/realted with react
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute,browserHistory} from 'react-router';
//main react component (RecipeBook)
import Main from './main'
import RecipeBook from './components/recipeBook'

//modules I made myself
import {recipeReducer} from './reducers/recipeReducers'
import {addRecipe,deleteRecipe,getRecipes} from './actions/recipeActions'

//store declaration
const middleware = applyMiddleware(logger)
const store = createStore(recipeReducer,middleware)

//allows you to provide/link the store , ie. redux states to the react component
//route declaration
const Routes = (
<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={RecipeBook}/>
    </Route>
  </Router>
</Provider>
)

render (Routes,document.getElementById('app'))
