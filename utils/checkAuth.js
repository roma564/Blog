import jwt from 'jsonwebtoken'

export default (req, res, next) => {

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    console.log(token + typeof(token))

    if(token && token != 'nullstring'){
        try {
            const decoded = jwt.verify(token, 'secret message')
            

            req.userId = decoded._id

            next()

        } catch (err) {
            res.status(401)
            res.json({"message" : `${err}`} )
            // res.redirect('/login');
            // throw new Error(err)
            // Якщо токен недійсний або є помилка, редіректимо на сторінку логіну
            // res.status(false)
           
        }
    } else {
        // Якщо токен відсутній, редіректимо на сторінку логіну
        res.status(401);
        res.redirect('/login');
    }

    
}
