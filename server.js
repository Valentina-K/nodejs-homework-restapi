const mongoose = require("mongoose");

const app = require('./app')

const {DB_HOST} = process.env;
mongoose.set('strictQuery',true);
//console.log(process.env)

mongoose.connect(DB_HOST)
.then(()=>
{
  app.listen(3000);
  //console.log("success")
})
.catch(err=>
  {
    console.log(err.message);
    process.exit(1); //exix all processes
})
