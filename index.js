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
    const postCollection = client.db('AidUnity').collection('Posts');
    const commentCollection = client.db('AidUnity').collection('Comments');
    const likeCollection = client.db('AidUnity').collection('Likes');
    const dislikeCollection = client.db('AidUnity').collection('DisLikes');
    const volunteerCollection = client.db('AidUnity').collection('Volunteer');
    const paymentCollection = client.db('AidUnity').collection('Payment');

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
                price: updateAids.price, 
                description: updateAids.description, 
                category: updateAids.category, 
               
            }
        }
      
        const result = await aidCollection.updateOne(filter, info)
        
        res.send(result);
      })

      //get event
    app.get('/events', async(req,res)=>{
        const cursor = eventCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


     //post event

     app.post('/events', async (req,res) =>{
        const event = req.body;
        console.log(event);
        const result = await eventCollection.insertOne(event)
        res.send(result);
      })

      app.get('/events/:id', async(req,res) =>{
        const id = req.params.id;
        console.log(res.params);
        const query = { _id: new ObjectId(id)}
        const result = await eventCollection.findOne(query);
        res.send(result)
    })
        //delete all event by id
        app.delete('/events/:id', async (req,res) =>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id)}
          
            const result = await eventCollection.deleteOne(query)
            res.send(result);
          })

          app.put('/events/:id', async(req,res)=>{
            const id = req.params.id;
            console.log(id);
            const filter ={_id : new ObjectId(id)}
            const options = {upsert: true};
            const updateAids= req.body;
            const info ={
                $set: {
                     title: updateAids.title, 
                     date: updateAids.date, 
                  
                    description: updateAids.description, 
               
                   
                }
            }
          
            const result = await eventCollection.updateOne(filter, info)
            
            res.send(result);
          })
    
      //post 

     app.post('/posts', async (req,res) =>{
        const event = req.body;
        console.log(event);
        const result = await postCollection.insertOne(event)
        res.send(result);
      })

    //get posts
    app.get('/posts', async(req,res)=>{
        const cursor = postCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.put('/posts/:id', async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const filter ={_id : new ObjectId(id)}
        const options = {upsert: true};
        const updatePosts= req.body;
        const info ={
            $set: {
                 title: updatePosts.title, 
                 image: updatePosts.image, 
                 userImage: updatePosts.userImage, 
                 userName: updatePosts.userName, 
                 like: updatePosts.like, 
                 dislike: updatePosts.dislike, 
                 userEmail: updatePosts.userEmail,

                 time: updatePosts.time, 
              
                datails: updatePosts.datails, 

            }
        }
      
        const result = await postCollection.updateOne(filter, info)
        
        res.send(result);
      })
      //post volunteer

     app.post('/volunteer', async (req,res) =>{
        const event = req.body;
        console.log(event);
        const result = await volunteerCollection.insertOne(event)
        res.send(result);
      })

    //get volunteer
    app.get('/volunteer', async(req,res)=>{
        const cursor = volunteerCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    



    

    app.put('/volunteer/:id', async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const filter ={_id : new ObjectId(id)}
        const options = {upsert: true};
        const updateVolunteer= req.body;
        const info ={
            $set: {
                 eventID: updateVolunteer.eventID, 
                 userImage: updateVolunteer.userImage, 
                 userName: updateVolunteer.userName,  
                 userEmail: updateVolunteer.userEmail,
                 Status: updateVolunteer.Status

                
           
               
            }
        }
      
        const result = await volunteerCollection.updateOne(filter, info)
        
        res.send(result);
      })

      app.get('/volunteer/event', async (req,res) =>{
        let query= {};
      
      if(req.query?.eventID){
          query = {eventID: req.query.eventID}
      }
        const result = await volunteerCollection.find(query).toArray();
      res.send(result);
      })

      
      app.get('/volunteer/event/email', async (req,res) =>{
        let query= {};
      
      if(req.query?.volunteerEmail){
          query = {volunteerEmail: req.query.volunteerEmail}
      }
        const result = await volunteerCollection.find(query).toArray();
      res.send(result);
      })

      app.delete('/posts/:id', async (req,res) =>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id)}
      
        const result = await postCollection.deleteOne(query)
        res.send(result);
      })
  

      app.delete('/posts/:id', async (req,res) =>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id)}
      
        const result = await postCollection.deleteOne(query)
        res.send(result);
      })
  

      
      
      //comments 

     app.post('/comments', async (req,res) =>{
        const event = req.body;
        console.log(event);
        const result = await commentCollection.insertOne(event)
        res.send(result);
      })

    //get posts
    app.get('/comments', async(req,res)=>{
        const cursor = commentCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })



      app.get('/comments/posts', async (req,res) =>{
        let query= {};
      
      if(req.query?.postID){
          query = {postID: req.query.postID}
      }
        const result = await commentCollection.find(query).toArray();
      res.send(result);
      })

      //post Like
app.post('/likes', async (req,res) =>{
    const like = req.body;
    console.log(like);
    const result = await likeCollection.insertOne(like)
    res.send(result);
  })

  app.get('/likes', async (req,res)=>{
  
    const cursor = likeCollection.find();
    const result = await cursor.toArray();
    res.send(result);
    })



  app.get('/likes/email', async (req,res) =>{
    let query= {};
  
  if(req.query?.userEmail){
      query = {userEmail: req.query.userEmail}
  }
    const result = await likeCollection.find(query).toArray();
  res.send(result);
  })
  

      
      //post DisLike
app.post('/dislikes', async (req,res) =>{
    const like = req.body;
    console.log(like);
    const result = await dislikeCollection.insertOne(like)
    res.send(result);
  })

  app.get('/dislikes', async (req,res)=>{
  
    const cursor = dislikeCollection.find();
    const result = await cursor.toArray();
    res.send(result);
    })



  app.get('/dislikes/email', async (req,res) =>{
    let query= {};
  
  if(req.query?.userEmail){
      query = {userEmail: req.query.userEmail}
  }
    const result = await dislikeCollection.find(query).toArray();
  res.send(result);
  })


  app.post('/payments', async (req,res) =>{
    const like = req.body;
    console.log(like);
    const result = await paymentCollection.insertOne(like)
    res.send(result);
  })

  app.get('/payments', async (req,res)=>{
  
    const cursor = paymentCollection.find();
    const result = await cursor.toArray();
    res.send(result);
    })



  app.get('/payments/email', async (req,res) =>{
    let query= {};
  
  if(req.query?.userEmail){
      query = {userEmail: req.query.userEmail}
  }
    const result = await paymentCollection.find(query).toArray();
  res.send(result);
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