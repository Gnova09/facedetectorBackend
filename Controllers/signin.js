const handleSignin = (db,bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
       return res.status(400).json("Incorrect submision")
    }

    db.select("*").from("login").where({
        email: email
    }).then(user => {
        //res.json(user)
        bcrypt.compare(password, user[0].hash, function (err, result) {
            // result == true
            if (result === true) {
                db.select("*").from("users").where({email: email})
                .then(user=>res.json(user[0]))
            }else{
                res.status(400).json("Not enable to login")
            }
        }); 
    }).catch(err => res.status(400).json("Not enable to login"));
}
 module.exports = {
    handleSignin:handleSignin
}