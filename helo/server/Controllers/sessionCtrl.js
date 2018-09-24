module.exports=function(req,res){
    if(req.session.user){
        res.redirect('/#/dashboard')
    }else{
        console.log('unauthorized')
        res.sendStatus(403)
    }
}