const express=require('express')
const cors=require('cors')
require('dotenv').config()
const app= express()
const port=process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const user= 'Web-dev'
const pass= 'j2RgVlBysklA6fuU'


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${user}:${pass}@cluster0.trqhxan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const headingcollection = client.db("Web-dev").collection("heading");
    const subHeadingcollection = client.db("Web-dev").collection("subHeading");

    const categorycollection = client.db("Web-dev").collection("category");

    app.get('/heading',async(req,res)=>{
      const result= await headingcollection.find().toArray()
      res.send(result)
    })

    app.get('/subHeading',async(req,res)=>{
      const result= await subHeadingcollection.find().toArray()
      res.send(result)
    })

    app.get('/category',async(req,res)=>{
      const result= await categorycollection.find().toArray()
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('boss is sitting')
})
app.listen(port,()=>{
    console.log(`bistro boss is sitting on ${port}`)
})