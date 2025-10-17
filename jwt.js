// jwt.js  ✅ ESM version

import jwt from 'jsonwebtoken';

const jwtAuthMiddleware=(req,res,next)=>{
const token =req.headers.authorization;
if(!token)return res.status(401).json({error:'no token found'});
try{
   const decoded=jwt.verify(token,process.env.JWT_SECRET);
   req.user=decoded;
   next(); 
}catch(err){
  console.error(err);
  res.status(401).json({error:'invalid token'});

}
}
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);

}

export default {jwtAuthMiddleware,generateToken};

