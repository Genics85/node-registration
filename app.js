const express   =require("express");
const expressLO =require("express-ejs-layouts");
const app       =express();
const mongoose  =require("mongoose");

//Connection to mongodb database
mongoose.connect("mongodb://localhost:27017/second-login",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connected to database"))
.catch(err=>console.log(err));

const port=process.env.PORT || 5000;

//Middlewares
app.use(expressLO);
app.set("view engine","ejs");
//Routes
app.use("/",require("./routes/index.js"));
app.use("/users",require("./routes/user.js"))


app.listen(port,console.log(`listening on port ${port}`));