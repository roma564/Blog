import jwt from 'jsonwebtoken'
import brcypt from 'bcrypt'
import UserModel from '../models/User.js'

export const login = async (req, res) => {
    try {
       

        const user = await UserModel.findOne({ email: req.body.email})

        if(!user){
            return res.status(404).json({
                DEVmessage: 'User are not found'
            })
        }

        const isValidPass = await brcypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass){
            return res.status(400).json({
                message: ' password are wrong'
            })
        }

        const token = jwt.sign({
            _id : user.id,
        }, 'secret message', 
        {expiresIn: '2d'})

        const {passwordHash, ...userData} = user._doc
    
        res.json({...userData, token})
       

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Login is not succesfull"
        })
    }
}


export const register = async (req,res) =>{
    try {
         
     
     
         const password = req.body.password
         const salt = await brcypt.genSalt(10)
         const hash = await brcypt.hash(password, salt)
     
         const doc = new UserModel({
     
             email: req.body.email,
             passwordHash: hash,
             fullName: req.body.fullName,
             avatarUrl: req.body.avatarUrl
     
     
         })
     
         const user = await doc.save()
 
         const token = jwt.sign({
             _id : user.id,
         }, 'secret message', 
         {expiresIn: '2d'})
 
         const {passwordHash, ...userData} = user._doc
     
         res.json({...userData, token})
 
 
         
    } catch (err) {
         console.log(err)
         res.status(500).json({
             message: "Registration in not succesfull"
         })
    }
 }


export const getMe = async (req, res) => {
    try {
            const user = await UserModel.findById(req.userId)

            if(!user){
                return res.status(404).json({
                    message : 'User not found'
                })
            }

        const {passwordHash, ...userData} = user._doc
    
        res.json({...userData })

        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "No access"
        })
    }
}




