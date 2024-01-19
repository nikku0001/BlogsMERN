import jwt from "jsonwebtoken";
import User from "../model/User.js";


const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({message: 'authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try{
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(_id).select('_id');
        req.user = user._id;
        
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message: 'Request is not authorized'});
    }
}

export default requireAuth;