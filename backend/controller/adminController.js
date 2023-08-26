import adminModel from "../model/Admin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const addAdmin = async (req,res,next)=>{
    const {email,password} =req.body
    if (!email && email.trim() === "" && !password && password.trim()) {
        return res.status(422).json({
          message: "Invalid data",
        });
      }
    try {
        let existingAdmin = await adminModel.findOne({email})
        if(existingAdmin){
            return res.status(400).json({
                message:"Admin already exist"
            })
        }
        const hashpassword = bcrypt.hashSync(password)
        let admin = new adminModel({email,password:hashpassword})
        await admin.save()
        if(!admin){
            return res.status(500).json({
                message:"Unable to create admin"
            })
        }
        return res.status(200).json({
            admin
        })

      
    } catch (error) {
        next(error)
    }
}

export const adminLogin = async(req,res,next)=>{
    const {email,password} =req.body
    if (!email && email.trim() === "" && !password && password.trim()) {
        return res.status(422).json({
          message: "Invalid data",
        });
      }
      try {
        let existingAdmin = await adminModel.findOne({email})
        if(!existingAdmin){
            return res.status(400).json({
                message:"Admin not found"
            })
        }
        const isPasseordCorrect = bcrypt.compareSync(password,existingAdmin.password)
        if(!isPasseordCorrect){
            return res.status(400).json({
                message : "Invalid Password"

            })
        }
        const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
            expiresIn: "7d",
        })
        return res.status(200).json({
            message :  "autentication complete",
            token,
            id : existingAdmin._id
        })
      } catch (error) {
        next(error)
      }

}

export const getAdmin = async(req,res,next)=>{
    let admins;
    try {
        admins = await adminModel.find({})

    } catch (error) {
        next(error)
    }
    if(!admins){
        return res.status(500).josn({message:"internal server error"})
    }
    return res.status(200).json({admins})
}