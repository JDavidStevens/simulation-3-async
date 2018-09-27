module.exports = {
    read: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.robots().then(
            robos => {
                res.status(200).send(robos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    getOne: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.oneRobot([req.params.id])
            .then(robo => res.status(200).send(robo))
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." })
                console.log(err)
            })
    },

    update: (req, res) => {
        const dbInstance = req.app.get('db');
        let { first_name, last_name, gender, hair, eye, hobby, bday, bmonth, byear} = req.body;


        dbInstance.update([req.params.id, first_name,last_name, gender, hair, eye, hobby, bday, bmonth, byear])
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

        dbInstance.addFriend().then(
            () => {
                res.sendStatus(200)
            }
        )
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })

    }
}