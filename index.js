import express, { response } from 'express'

import mongoose from 'mongoose'
import multer  from 'multer'

import cors from 'cors'


import * as Validation from './validations/validation.js'

import {UserController, PostController} from './controllers/index.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'

import path from 'path';
import url from 'url';   // Import url module




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

// Роздача HTML сторінок

// Get __dirname equivalent in ES Modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Це потрібно для того, щоб Express обслуговував статичні файли з папки 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'posts.html'));
});

app.get('/post-details.html', (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'post-details.html'));
  });

// app.get('/posts/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'postDetails.html'));
// });


// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'register.html'));
// });

// app.get('/posts', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'posts.html'));
// });

// app.get('/create-post', checkAuth, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'createPost.html'));
// });

// app.get('/post/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'postDetails.html'));
// });



app.post('/login', Validation.loginValidation, handleValidationErrors , UserController.login)
app.post('/register', Validation.registerValidation, handleValidationErrors, UserController.register)
app.get('/me', checkAuth , UserController.getMe)
app.get('/posts/:id', PostController.getOne); // Маршрут для отримання конкретного поста за ID


app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/api/posts', PostController.getAll)
app.get('/api/posts/:id', PostController.getOne)
app.post('/api/posts', checkAuth, Validation.postCreateValidation, PostController.create)
app.delete('/api/posts/:id',checkAuth , PostController.remove)
app.patch('/api/posts/:id',checkAuth , PostController.update)




const PORT = 4444

app.listen(PORT,(err) => {
    if(err)
        console.log(err)
    else
        console.log('Server started: http://localhost:' + PORT)
})


