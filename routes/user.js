const express=require("express");
const router = express.Router();

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",(req,res)=>{
    const{name,email,password,password2} = req.body;
    let errors=[];
    if(!name||!email||!password||!password2){
        errors.push({msg:"all fields are rquired"})
    }
    if(password!==password2){
        errors.push({msg:"Password do not match"})
    }
    if(password.length<6){
        errors.push({msg:"password must be atleast six letters"})
    }
    if(errors.length>0){
        res.render("register",{
            errors,
            name,
            email,
            password,
            
        })
    }else{
        res.send("pass")
    }
})

module.exports=router;