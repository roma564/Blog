import express, { response } from 'express'

import mongoose from 'mongoose'
import multer  from 'multer'

import cors from 'cors'


import * as Validation from './validations/validation.js'

import {UserController, PostController} from './controllers/index.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'


mongoose.connect('mongodb://localhost:27017/Blog-MERN')
.then(console.log('DB ok!'))
.catch(err => console.log(`DB error: ${err}`))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


app.post('/login', Validation.loginValidation, handleValidationErrors , UserController.login)
app.post('/register', Validation.registerValidation, handleValidationErrors, UserController.register)
app.get('/me', checkAuth , UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts',checkAuth , Validation.postCreateValidation, PostController.create)
app.delete('/posts/:id',checkAuth , PostController.remove)
app.patch('/posts/:id',checkAuth , PostController.update)




const PORT = 4444

app.listen(PORT,(err) => {
    if(err)
        console.log(err)
    else
        console.log('Server started: http://localhost:' + PORT)
})


