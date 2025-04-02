require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors=require('cors')
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ["https://port-folio-frontend-nine.vercel.app/", "http://localhost:5500"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true  
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
res.send("Hello World")
})
app.post('/contact',async(req,res)=>{
    const { name,
        email,
        mobile,
        contactMEthod1,
        contactMEthod2,
        message} = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
          });
          const mailOptions = {
            from: `${email}`,
            to: process.env.EMAIL_USER,
            subject: "New Form Submission",
            html: `<h3>New Contact Form Submission</h3>
                       <p><b>Name:</b> ${name}</p>
                       <p><b>Email:</b> ${email}</p>
                       <p><b>Mobile:</b> ${mobile}</p>
                       <p><b>Preferred Contact Method:</b> ${contactMEthod1}</p>
                       <p><b>Alternative Contact Method:</b> ${contactMEthod2}</p
                       <p><b>Message:</b> ${message}</p>`,
          };
        
          try {
         await  transporter.sendMail(mailOptions);
            res
              .status(200)
              .json({ success: true, message: "Email sent successfully!" });
          } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ success: false, message: "Failed to send email" });
          }          
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
});