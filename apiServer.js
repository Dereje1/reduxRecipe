var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//APIs
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/recipebook")
var Recipes = require('./models/recipes')

//Posts New Recipes//
app.post('/recipes', function(req,res){
  var recipeAdd = req.body;
  //console.log(recipe)
  Recipes.create(recipeAdd,function(err,recipes){
    if(err){
      throw err;
    }
    res.json(recipes)
  })

})

//GETS Recipes from db
app.get('/recipes',function(req,res){
  Recipes.find(function(err,recipes){
    if(err){
      throw err;
    }
    res.json(recipes)
  })

})

//Deletes Recipes from db
app.delete('/recipes/:_id', function(req, res){
   var query = {_id: req.params._id};
   console.log("Delete Request ", query )
   Recipes.remove(query, function(err, recipe){
     if(err){

     throw err;
     }
     res.json(recipe);
   })
});

//update Recipes from db
app.put('/recipes/:_id', function(req, res){
   var recipeToUpdate = req.body;
   var recipeID = req.params._id;
   // if the field doesn't exist $set will set a new field
   //change to findByIdAndUpdate to make it congruent with delete
   var update = { '$set': {ingredients: recipeToUpdate.ingredients}};
   // When true returns the updated document
   var options = {new: true};
   Recipes.findByIdAndUpdate(recipeID, update, options, function(err, recipe){
       if(err){
         throw err;
       }
       res.json(recipe);
   })
})
//END APIs

app.listen(3001,function(err){
  if(err){
    console.log(err)
  }
  console.log("API Server is listening on port 3001")
})
