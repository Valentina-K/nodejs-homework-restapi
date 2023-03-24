const validation = (schema)=> {
    return (req, res, next)=> {
        const {error} = schema.validate(req.body);
        if(error){
          const {key} = error.details[0].context;
          error.status = 400;
          error.message = `missing required ${key}`;
          next(error);
        }
        next()
    }
}

module.exports = validation;

