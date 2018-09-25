module.exports = function(req,res,next){
        if (req.session.user){
            res.status(200).send()
        } else {
            console.log('unauthorized')
            res.sendStatus(403)
        }
    }
