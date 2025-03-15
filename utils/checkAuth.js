import jwt from 'jsonwebtoken'

export default (req, res, next) => {

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token){
        try {
            
            const decoded = jwt.verify(token, 'secret message')

            req.userId = decoded._id
            next()

        } catch (err) {
            // Якщо токен недійсний або є помилка, редіректимо на сторінку логіну
            res.redirect('/login');
        }
    } else {
        // Якщо токен відсутній, редіректимо на сторінку логіну
        res.redirect('/login');
    }
}
