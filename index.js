const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;




// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.ennn1mj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // await client.connect();

    //DB Collection
    const aidCollection = client.db('AidUnity').collection('Aids');
    const eventCollection = client.db('AidUnity').collection('Events');

//get aids
    app.get('/aids', async(req,res)=>{
        const cursor = aidCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


    //search aids
    app.get('/aids/search', async (req,res)=>{

        const filter = req.query
        console.log(filter);  
           const query = {
           
            'category': {$regex: filter.search , $options: 'i'}
            }
        const cursor = aidCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })

    //post aids

    app.post('/aids', async (req,res) =>{
        const aids = req.body;
        console.log(aids);
        const result = await aidCollection.insertOne(aids)
        res.send(result);
      })

      app.get('/aids/:id', async(req,res) =>{
        const id = req.params.id;
        console.log(res.params);
        const query = { _id: new ObjectId(id)}
        const result = await aidCollection.findOne(query);
        res.send(result)
    })
    
    //delete all product by id
    app.delete('/aids/:id', async (req,res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
    
      const result = await aidCollection.deleteOne(query)
      res.send(result);
    })

    app.put('/aids/:id', async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const filter ={_id : new ObjectId(id)}
        const options = {upsert: true};
        const updateAids= req.body;
        const info ={
            $set: {
                 title: updateAids.title, 
                 picture: updateAids.picture, 
                price: updateAids.external_link, 
                description: updateAids.description, 
                category: updateAids.category, 
               
            }
        }
      
        const result = await aidCollection.updateOne(filter, info)
        
        res.send(result);
      })

      //get event
    app.get('/event', async(req,res)=>{
        const cursor = eventCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


     //post event

     app.post('/event', async (req,res) =>{
        const event = req.body;
        console.log(event);
        const result = await eventCollection.insertOne(event)
        res.send(result);
      })

      app.get('/event/:id', async(req,res) =>{
        const id = req.params.id;
        console.log(res.params);
        const query = { _id: new ObjectId(id)}
        const result = await eventCollection.findOne(query);
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



app.get('/', (req, res) => {
    res.send('AidUnity server is running')
})

app.listen(port, () => {
    console.log(`AidUnity Server is running on port: ${port}`)
})