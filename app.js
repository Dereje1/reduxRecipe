var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
   //if you leave any of the update fields out in the actual update
   // then it will set that property to null in the database therefore it is best to
   //just specify the property you want to update so the others remain intact, in this case
   //just the ingredients
   var update = {
       '$set':{
       ingredients:recipeToUpdate.ingredients
       }
    };
   // When true returns the updated document
   var options = {new: true};
   Recipes.findOneAndUpdate(recipeID, update, options, function(err, recipe){
       if(err){
         throw err;
       }
       res.json(recipe);
   })
})
//END APIs

// DEFINES THE MAIN ENTRY POINT
app.get('*', function(req, res){
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //console.log(req.body)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error');
});

module.exports = app;
