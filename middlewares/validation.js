const validation = (schema)=> {
  return (req, res, next) => {
      if (req.body.constructor===Object && Object.keys(req.body).length===0) {
      const error = new Error("missing fields");
      error.status = 400;
      next(error);
    }
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

