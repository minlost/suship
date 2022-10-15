const PORT = 8000
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const uri = "mongodb+srv://minlost:mobilek12044@cluster0.f57hupy.mongodb.net/Cluster0?retryWrites=true&w=majority"

const app = express()
app.use(cors())
app.use(express.json())

// Default
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/senddata', async (req, res) => {
    const client = new MongoClient(uri)
    const data = req.body.data

    try {
        console.log("this is" + data.date);
        await client.connect()
        const database = client.db('restaurant')
        const customer = database.collection('customers')

        const datas = {
            date: data.date,
            time: data.time,
            number: data.number,
            tel: data.tel ,
            name: data.name
            
        }

        const insertedCustomer = await customer.insertOne(datas)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})




app.put('/edit/:id', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.data
    const user = req.params.id


    try {
        await client.connect()
        const database = client.db('restaurant')
        const customer = database.collection('customers')
        
        const query = {
            _id: ObjectId(user)
        }

        const updateDocument = {
            $set: {
                date: formData.date,
                time: formData.time,
                number: formData.number,
                tel: formData.tel,
                name: formData.name,
            },
        }

        const insertedUser = await customer.updateOne(query, updateDocument)

        res.json(insertedUser)

    } finally {
        await client.close()
    }
})




app.get('/getdata', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const db = client.db('restaurant')
        const coll = db.collection('customers')

        const cursor = await coll.find().toArray()
        cursor.forEach(console.log);
        res.send(cursor)
    } finally {
        await client.close(); 
    }
})

app.delete('/getdata/:id', async (req, res) => {
    const client = new MongoClient(uri)
    const user = req.params.id
    console.log(user);

    try {
        await client.connect()
        const db = client.db('restaurant')
        const coll = db.collection('customers')

        const cursor = await coll.deleteOne({_id: user})
        res.send(cursor)
      
    } finally {
        await client.close(); 
    }
})


app.delete('/deletedata/:id', async (req, res) => {
    const client = new MongoClient(uri)
    // const user = "633dfbcbb23fc46414dbc4d8"
    const user = req.params.id

    console.log(user);

    try {
        console.log(user);
        await client.connect()
        const db = client.db('restaurant')
        const coll = db.collection('customers')

        const query = {
            _id: ObjectId(user)
        }


        const cursor = await coll.deleteOne(query)
        res.send("done")
    } finally {
        await client.close(); 
    }
})

app.get('/getdata/:id', async (req, res) => {
    const client = new MongoClient(uri)
    // const user = "633dfbcbb23fc46414dbc4d8"
    const user = req.params.id

    console.log(user);

    try {
        console.log(user);
        await client.connect()
        const db = client.db('restaurant')
        const coll = db.collection('customers')

        const query = {
            _id: ObjectId(user)
        }


        const cursor = await coll.find(query).toArray()
        res.send(cursor)
      
    } finally {
        await client.close(); 
    }
})

var token = ""

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const {jmeno, heslo} = req.body.data

  

    try {
        await client.connect()
        const db = client.db('restaurant')
        const coll = db.collection('admin')

        const data = {
            jmeno: jmeno,
            heslo: heslo
        }
        
        const cursor = await coll.find(data).toArray()
        const pass = cursor[0].heslo
        const log = cursor[0].jmeno
    

        // if(name === data.jmeno || pass === data.heslo){
        //     res.send(token)
        // } else {
        //     res.send("wrong")
        // }
        if (heslo === pass && jmeno === log){
            token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            
            res.status(201).json(token)
            console.log(token);
        }

    } catch(err) {
        console.log(err); 
    } finally {
        await client.close()
    }
})





app.listen(PORT, () => console.log('server running on PORT ' + PORT))