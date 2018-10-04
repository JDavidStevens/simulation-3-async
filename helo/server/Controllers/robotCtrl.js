module.exports = {
    read: (req, res) => {
        const dbInstance = req.app.get('db');
        // console.log("NameSearch:",req.query.name,req.query.nameQuery)
        
        if(req.query.first){
            dbInstance.searchFirst([req.query.first])
            .then(robos=>res.status(200).send(robos))
            .catch(err=>{
                res.status(500).send({errorMessage: "Error"});
                console.log(err);
            });
        }else if(req.query.last){
            dbInstance.searchLast([req.query.last])
            .then(robos=>res.status(200).send(robos))
            .catch(err=>{
                res.status(500).send({errorMessage: "Error"});
                console.log(err);
            });
        }else{
        dbInstance.robots([req.session.user.robot_id])
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
        }
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

        dbInstance.self([req.session.user.id])
            .then(self=>res.status(200).send(self))
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." })
                console.log(err)
            })
    },

    // getOne: (req, res) => {
    //     const dbInstance = req.app.get('db');

    //     dbInstance.oneRobot([req.session.user.id])
    //         .then(robo => res.status(200).send(robo))
    //         .catch(err => {
    //             res.status(500).send({ errorMessage: "Oops! Something went wrong." })
    //             console.log(err)
    //         })
    // },

    update: (req, res) => {
        const dbInstance = req.app.get('db');
        let { first_name, last_name, gender, hair, eye, hobby, bday, bmonth, byear} = req.body;


        dbInstance.update([req.session.user.id, first_name,last_name, gender, hair, eye, hobby, bday, bmonth, byear])
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

        dbInstance.addFriend([req.session.user.id,req.body.id])
        .then(robos=> {
                res.status(200).send(robos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })

    }
}