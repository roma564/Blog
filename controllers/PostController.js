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


export const create = async (req, res) => {
    try {
        
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageURL: req.body.imageURL,
            user: req.userId,
        })

        const post = await doc.save()

        res.status(200).json(post)
       


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Posting is not succesfull"
        })
    }
}

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