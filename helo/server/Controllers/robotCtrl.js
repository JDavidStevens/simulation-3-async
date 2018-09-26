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
    }
}