const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors')
const controller = require('./controller');

app.use(cors())
app.use(express.json());

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('errorObj.message ', errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});  


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
//we will be creating a new recipe
app.post('/recipe', controller.addRecipe, (req,res) => {
  return res.status(200).json(res.locals.recipe);
});

// get all of the recipes 
app.get('/recipes', controller.getRecipe, (req,res) => {
  return res.status(200).json(res.locals.recipes)
});

// get a recipe
app.get('/recipe/:id', controller.getOneRecipe, (req,res) => {
  return res.status(200).json(res.locals.specificRecipe)
});

//update a recipe 
app.put('/recipe/:id', controller.update, (req,res) => {
  return res.status(200).json(res.locals.recipe)
});


//delete a todo
app.delete('/recipe/:id', controller.delete, (req,res) => {
  return res.status(200).json('the recipe has been delete')
});