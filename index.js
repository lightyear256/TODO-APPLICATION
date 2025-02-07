const bcrypt=require('bcrypt');
const express=require('express');
const jwt=require('jsonwebtoken')
const z=require('zod');
const path=require('path')
require('dotenv').config();
const {UserModel,TodoModel} = require("./db");
const mongoose= require('mongoose');
const JWT_SECRET=process.env.SECRET_KEY;
mongoose.connect(process.env.DATABASE_URL)
const app=express();
console.log = function() {}; 

app.use(express.json())
app.use(express.static("./public"));
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "public", "index.html"))
})
app.post("/signup",async function(req,res){
    const requirebody=z.object({
        email:z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password:z.string().min(3).max(30)
    })
    const parse=requirebody.safeParse(req.body);

    if (!parse.success){
        res.json({
            msg:"incorrect format",
            error:parse.error
        })
        return 
    }

    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    try{
    const hashedpass=await bcrypt.hash(password,5);
    await UserModel.create({
        email:email,
        password:hashedpass,
        name:name
    })
    res.json({
        msg:"you are registered sucessfully"
    })
}
catch(e){
    res.status(409).json({
        msg:"user already exist"
    })
}

})
app.post("/login",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user=await UserModel.findOne({
        email:email,
    })
    if(!user){
        res.status(403).json({
            msg:"user not found",
            done:"n"
        })
        return;
    }
    const passwordmatch=await bcrypt.compare(password,user.password);
    if(passwordmatch){
        const token=jwt.sign({
            id:user._id
        },JWT_SECRET);
        res.json({
            token:token,
            msg:"you are signed in sucessfully",
            done:"y"
        })
    }
    else{
        res.status(403).json({
            msg:"Incorrect credentials"
        })
        return
    }
})
function auth(req,res,next){
    const token=req.headers.token;
    if(token){
    const veri=jwt.verify(token,JWT_SECRET);
    req.userid=veri;
    next(); 
    }
    else{
        return res.send({
            done:"n",
            msg:"you are not logged in"
        })
    }
}
app.get("/home",function(req,res){
    res.sendFile(path.join(__dirname, "public", "index2.html"));

})
app.use(auth);
app.post("/todoadd",async function(req,res){
    const todo=req.body.todo;
    const veri=req.userid;
    await TodoModel.create({
        userId:veri.id,
        title:todo,
    })
    res.send("done")

})
app.put("/update",async function(req,res){
    const id=req.body.id;
    const veri=req.userid;
    const todoup=req.body.todo;
    try{
        const todo=await TodoModel.findOneAndUpdate(
           { _id:id,
            userId:veri.id
           },{
                title:todoup,
           }
        )
        if(!todo){
            res.status(403).json({
                msg:"not found or unauthorised"
            })
            return 
        }
        res.json({
            msg:"updated successfully"
        })
        
    }catch(e){
        res.status(500).json({
            msg:"Internal server error"
        })
    }
})
app.delete("/delete/:id",async function(req,res){
    const id=req.params.id;
    const veri=req.userid;
    try{
        const todo=await TodoModel.findOneAndDelete({
                _id:id,
                userId:veri.id
        })

        if(!todo){
            res.status(403).json({
                msg:"not found or unauthorised"
            })
            return 
        }
        res.json({
            msg:"deleted successfully"
        })
    }catch(e){
        res.status(500).json({
            msg:"internal server error",
            error:e
        })
    }

})
app.get("/todos",async function(req,res){
    const veri=req.userid;
    const user=await TodoModel.find({
        userId:veri.id,
    })
    if(user){
        res.json({
            todo:user
        })
    }
    else{
        res.status(404).send({
            msg:"not found",
        })
    }
})
app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
});