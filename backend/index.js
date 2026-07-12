const express=require("express")
const cors=require("cors")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())
app.use(cors())
const nodemailer = require("nodemailer");

mongoose.connect("mongodb://127.0.0.1:27017/passkey").then(function()
{
    console.log("connected to db")
}).catch(function()
{
    console.log("failed")
})
const credential=mongoose.model("credential",{},"bulkmail")

// Create a transporter using SMTP

app.post("/sendemail", async function(req,res)
{
    var msg = req.body.msg
    var subject = req.body.subject
    var emailList = req.body.emailList

    try
    {
        const data = await credential.find()

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:data[0].toJSON().user,
                pass:data[0].toJSON().pass
            }
        })

        for(let i=0; i<emailList.length; i++)
        {
            await transporter.sendMail({
                from:data[0].toJSON().user,
                to:emailList[i],
                subject:subject,
                text:msg
            })

            console.log("Email sent to " + emailList[i])
        }

        res.send(true)
    }
    catch(error)
    {
        console.log(error)
        res.send(false)
    }
})




app.listen(5000,function()
{
    console.log("server started")
}
)
