

module.exports={ VerifyToken:(req,res,next) => {
  //console.log("header",req);
  if(req.rawHeaders[15]==="http://localhost:3000")
  next();
    const jwt =require("jsonwebtoken");
   // console.log("token verification");
   // console.log("finding key",req.rawHeaders[5]);
    let token=req.headers['authorization'];
   // let token=req.rawHeaders[5];
    if(token){
    token=token.split(' ')[1].trim();
   // token=token.replace(" ","")
//console.log("token is",token);
    jwt.verify(token,process.env.JWT_Key,(err,valid)=>{
    if(err){
   // console.log("the error is",err);
      res.json({msg:err})
     
    }else{
     // console.log("No error going next");
    next();
    
    }
    
    
    
    })
    
    }
    else
    {
//console.log("autherization error");
      return({msg:"token not provided"})
    }
    

    
  }
}

