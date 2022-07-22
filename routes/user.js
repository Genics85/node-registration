const express=require("express");
const router = express.Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");

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
        User.findOne({email})
        .then(user=>{
            if(user){
                errors.push({msg:"user exists already"});
                res.render("register",{
                    errors,
                    name,
                    email,
                    password
                })
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                        .then(
                            user=>{
                                req.flash("succes_msg","Registration successful, login in now")
                                res.redirect("/users/login")
                            }
                        )
                        .catch(err=>console.log(err))
                    })
                })

            }
        })
    }
})

module.exports=router;