
const jwtkey=process.env.JWT_Key
exports.Authencticate = async (req, res) => {
  const jwt =require("jsonwebtoken");
 
  try {
   // console.log("in atuhenticator")
    console.log(req);
    let data=req[0].roleID;
    console.log(req);
   const token= await jwt.sign({data},jwtkey,{ expiresIn: '1D' })
   //console.log("singed token",token);
return(token);
  } catch (error) {
    console.log(error);
    
  }
};