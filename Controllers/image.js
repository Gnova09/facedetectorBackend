const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");


const handleimage=(db)=>(req, res) => {
    const { email } = req.params;

    db.select("*").from("users").where({ email: email }).increment({
        entries: 1
    }).then(data => {
        db.select("entries").from("users").where({email:email}).then(entries=>
        res.json(entries[0]));
    }).catch(err => res.status(400).json("cant increment entries"))
}
handleimageURL=()=> async (req,res)=>{
const {url}=req.body;
const USER_ID = 'bi5o8xa6ktoi';
const PAT = 'ad0d1725b7094adc94c6c95d924a2c83';
const APP_ID = '75942c613a1344518ee944a0d22d03de';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key "+ PAT);
stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: MODEL_ID,
        inputs: [{data: {image: {url: url}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(400).json("Error");
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return res.status(400).json("error");
        }
        if(response){
            res.json(response.outputs[0].data)
        }
    }
);



}

module.exports={
    handleimage,
    handleimageURL
}