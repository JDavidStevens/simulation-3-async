module.exports = {
    read: (req, res) => {
        // console.log("offset",req.query)
        const dbInstance = req.app.get('db');
        // console.log("NameSearch:",req.query.name,req.query.nameQuery)
        
        if(req.query.first){
            dbInstance.searchFirst([req.session.user.robot_id,req.query.first,req.query.offset])
            .then(robos=>res.status(200).send(robos))
            .catch(err=>{
                res.status(500).send({errorMessage: "Error"});
                console.log(err);
            });
        }else if(req.query.last){
            dbInstance.searchLast([req.session.user.robot_id,req.query.last,req.query.offset])
            .then(robos=>res.status(200).send(robos))
            .catch(err=>{
                res.status(500).send({errorMessage: "Error"});
                console.log(err);
            });
        }else{
            // console.log("string test", req.query.offset,req.query.offset*3)
        dbInstance.robots([req.session.user.robot_id,req.query.offset])
        .then(
            robos => {
                // console.log("robots.sql:", robos)
                res.status(200).send(robos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
        }
    },

    count: (req, res) => {
        const dbInstance = req.app.get('db');

        if(req.query.first){
            dbInstance.countFirst([req.session.user.robot_id,req.query.first])
            .then(sum=>res.status(200).send(sum))
            .catch(err=>{
                res.status(500).send({errorMessage: "Error"});
                console.log(err);
            });
        }else if(req.query.last){
            dbInstance.countLast([req.session.user.robot_id,req.query.last])
            .then(sum=>res.status(200).send(sum))
            .catch(err=>{
                res.status(500).send({errorMessage: "Error"});
                console.log(err);
            });
        }
    
        dbInstance.count([req.session.user.robot_id])
        // console.log("user acquired?",req.session.user)
        .then(
            sum => {
                // console.log("sum.sql:", sum)
                res.status(200).send(sum)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    recommend:(req,res)=>{
        const dbInstance = req.app.get('db');

        dbInstance.recommend([req.session.user.robot_id])
        // console.log("user acquired?",req.session.user)
        .then(
            robos => {
                // console.log("robots.sql:", robos)
                res.status(200).send(robos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    getSelf: (req,res)=>{
        const dbInstance = req.app.get('db');

        dbInstance.self([req.session.user.robot_id])
            .then(self=>res.status(200).send(self))
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." })
                console.log(err)
            })
    },

    update: (req, res) => {
        const dbInstance = req.app.get('db');
        let { first_name, last_name, gender, hair, eye, hobby, bday, bmonth, byear} = req.body;


        dbInstance.update([req.session.user.robot_id, first_name,last_name, gender, hair, eye, hobby, bday, bmonth, byear])
            .then(robos => {
                res.status(200).send(robos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." })
                console.log(err)
            })
    },

    add: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.addFriend([req.session.user.robot_id,req.body.id])
        .then(robos=> {
                res.status(200).send(robos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })

    },

    remove: (req,res)=>{
        const dbInstance= req.app.get('db');

        dbInstance.removeFriend([req.session.user.robot_id,req.body.id])
        .then(robos=>{
            res.status(200).send(robos)
        })
        .catch(err=>{
            res.status(500).send({errorMessage: "Oops! Something went wrong." });
            console.log(err);
        })
    }
}