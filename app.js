import express, { json } from 'express'
import fs from 'fs'
import { MongoClient } from 'mongodb'
import cors from 'cors'

const app = express();

app.use(cors({
    origin:'*',
}))
app.use(express.json())

app.get('/get-resume',(req,res)=>{
    const filePath = './NIRANJAN S R RESUME.PDF';
    try {
        const fileStream = fs.createReadStream(filePath);
    
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="Niranjan S R resume.pdf"'); // Optional filename control
    
        fileStream.pipe(res);
    
        fileStream.on('error', (err) => {
          res.status(500).send('Error reading file');
        });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An unexpected error occurred');
      }
})

app.post('/contact', async(req,res)=>{
    let data = req.body;
    try {
        const client = await MongoClient.connect(process.env.DBURL);
        client.db('portfolio').collection('contact').insertOne(data);
        res.status(200).json({
            status: 'sucess',
            response : 'message sent sucessfully'
        })

    } catch (response) {
        res.status(400).json({
            status:'failed',
            response :'message failed'
        })
    }
})

export default app