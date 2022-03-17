const db = require('./models.js')

const controller = {}

controller.addRecipe = async (req, res, next) => {
    const { description, title} = req.body;
    
    try {
        const text = `INSERT INTO newRecipe (title, description) VALUES($1, $2) RETURNING *`;
        const params = [title, description];
        const result = await db.query(text, params);
        res.locals.recipe = result.rows[0]
        return next();
    }

    catch(err) {
        next({
            log: 'Express error handler caught unknown middleware error',
            status: 400,
            message: { err: 'An error occurred in postRecipe' },
          })
    }
    


}

controller.getRecipe = async (req,res,next) => {


    try{
        const result = await db.query(`SELECT * FROM newRecipe`)
        res.locals.recipes = result.rows;
        return next(); 

    }
    
    catch(err) {
        next({
            log: 'Express error handler caught unknown middleware error',
            status: 400,
            message: { err: 'An error occurred in getRecipe' },
          })
    }



}


controller.getOneRecipe = async(req,res,next)=> {
    const {id} = req.params;

    try{
        const text = `SELECT * FROM newRecipe WHERE recipe_id = $1`;
        const param = [id];
        const result = await db.query(text, param);
        console.log(result); 
        res.locals.specificRecipe = result.rows[0]
        return next()
    }
    catch(err) {
        next({
            log: 'Express error handler caught unknown middleware error',
            status: 400,
            message: { err: 'An error occurred in getOneRecipe' },
          })
    }
}

controller.update = async(req, res, next) => {
    const {id} = req.params; 
    const {title, description} = req.body; 

    try{
        const text = `UPDATE newRecipe SET title = $1, description = $2 WHERE recipe_id = $3`
        const param = [title, description, id]
        await db.query(text, param); 
        console.log(1)
        const updatedModel = await db.query(`SELECT * from newRecipe where recipe_id='${id}'`)
        console.log(updatedModel, '----updatedModle')
        res.locals.recipe = updatedModel.rows[0]
        return next(); 
    }
    
    catch(err) {
        next({
            log: 'Express error handler caught unknown middleware error',
            status: 400,
            message: { err: 'An error occurred in getOneRecipe' },
          })
    }



}

controller.delete = async (req, res, next) => {

    const {id} = req.params; 

    try{
        const text = `DELETE FROM newRecipe WHERE recipe_id = $1`
        const param = [id]
         db.query(text, param); 
         return next(); 
    }
    catch(err) {
        next({
            log: 'Express error handler caught unknown middleware error',
            status: 400,
            message: { err: 'An error occurred in getOneRecipe' },
          })
    }

}


module.exports = controller; 