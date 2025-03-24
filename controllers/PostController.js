import PostModel from "../models/Post.js"

export const getAll = async (req, res) => {
    try {
        
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to retrieve the articles"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        
        const postID = req.params.id


        PostModel.findOneAndUpdate(
        { _id: postID,},
        { $inc : {viewsCount: 1} },
        { returnDocument: 'after' })
        .then(doc => {
            res.json(doc)
            if (!doc){
                res.json({
                    message: 'Cannot find article'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({
                message: 'Cannot return article'
            })
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to retrieve the article"
        })
    }
}

export const remove = async (req, res) => {
    try {
        
        const postID = req.params.id

        PostModel.findByIdAndDelete({
            _id: postID
        })
        .then( doc => {
            if (!doc){
                console.log(doc)
                return res.status(404).json({
                    message: 'Cannot find article'
                })
            }
            res.json({
                success: true
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Cannot delete article'
            })
        })

        
       

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to retrieve the article"
        })
    }
}


import multer from 'multer';
import path from 'path';

// Налаштування Multer для збереження файлів
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/');  // Папка для збереження файлів
    },
    filename: (_, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Генерація унікального імені для файлу
    },
});

const upload = multer({ storage });

// Оновлене створення поста з обробкою зображення
export const create = async (req, res) => {
    try {
        // Обробка файлів через Multer (якщо вони є)
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload failed' });
            }

            const imageURL = req.file ? `/uploads/${req.file.filename}` : null;  // Отримуємо URL зображення

            const doc = new PostModel({
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageURL: imageURL,  // Зберігаємо URL зображення в базі даних
                user: req.userId,  // Користувач, який створює пост
            });

            const post = await doc.save();
            res.status(200).json(post);  // Відправляємо створений пост назад на клієнт

        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Posting is not successful"
        });
    }
};

export const update = async (req, res) => {
    try {
        
        const postID = req.params.id

        PostModel.updateOne({
            _id: postID
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageURL: req.body.imageURL,
            user: req.userId,
        })
        .then( doc => {
            if (!doc){
                console.log(doc)
                return res.status(404).json({
                    message: 'Cannot find article'
                })
            }
            res.json({
                success: true
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Cannot delete article'
            })
        })


    } catch (error) {
        console.log(err)
        res.status(500).json({
            message: "Updating is not succesfull"
        })
    }
}