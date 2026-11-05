import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";


const register = async (req, res) => {

    const {name,email,password} = req.body;


    //check if user already exit or not 
    const userExists = await prisma.user.findUnique({
        where :{email:email},
    });

    if(userExists){
        return res
        .status(400)
        .json({error: "user alreday exites with this email"});
    }

    //Hash Password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);


    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });

    res.status(201).json({
        status: "success",
        data:{
            user:{
                id:user.id,
                name: name,
                email: email,
            },
        },
    });

};


//login 

const login = async (req,res) =>{
    const { email,password} =req.body;

     //check if user email already exit or not in the table
    const userExists = await prisma.user.findUnique({
        where :{email:email},
    });

    if(!user){
        return res
        .status(401)
        .json({error: "invalid email or password"});
    }


    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res
        .status(401)
        .json({error: "invalid email or password"});
    }
    


};

export { register ,login};