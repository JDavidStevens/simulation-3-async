module.exports = function(req,req){
        if (req.session.user){
            res.status(200).send(req.session.user)
        } else {
            console.log('unauthorized')
            res.sendStatus(403)
        }
    }
