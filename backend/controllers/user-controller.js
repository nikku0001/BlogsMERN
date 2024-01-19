import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '2d'});
}


export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    if(existingUser.name !== name){
      return res.status(400).json({ message: "Email already in use! Use another one."});
    }
    return res
      .status(400)
      .json({ message: "User Already exists! Login Instead" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }

  const token = createToken(user._id);


  return res.status(201).json({ token });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found! Register First" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }

  
  const token = createToken(existingUser._id);

  return res
    .status(200)
    .json({ existingUser , token });
};
