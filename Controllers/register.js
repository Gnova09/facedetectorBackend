const handleRegister=(db,bcrypt)=> (req, res) => {

    const { name, lastname, email, password } = req.body;
    if(!name||!lastname||!email||!password){
        return res.status(400).json("Incorrect Submision")
    }
    bcrypt.hash(password, 10, (err, hash) => {
        // Store hash in your password DB.  
        db.transaction(trx => {
            trx.insert({
                email: email, hash: hash
            }).into("login")
                .then(resp => {
                    return trx("users")
                        .insert({
                            name: name + " " + lastname,
                            email: email,
                            joined: new Date()
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })
            .then(user => res.json(user))
            .catch(err => res.status(400).json("Not enable to create"));
    });
}

module.exports={
    handleRegister
}