const handleprofile=(db)=>(req, res) => {
    const { email } = req.params;

    db.select("*").from("users").where({ email: email }).then(user => {
        if (user.length) {
            res.json(user);
        } else {
            res.status(400).json("Not Found")
        }

    }).catch(err => res.status(400).json(err))
}
module.exports={
    handleprofile
}