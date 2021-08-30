// BUILD YOUR SERVER HERE
//imports
const express = require('express')
const Mod = require('./users/model')

//instance of express app
const server = express()
//globalmiddleware (teaches server to read in json)
server.use(express.json())


server.get('/', (req, res) => {
    res.status(200).json({ message: 'hey there' })
  })

//Fetch all users
server.get('/api/users', (req,res) => {
    Mod.find()
    .then(mods=> {
        res.status(200).json(mods)
    })
    .catch(err=>{
        res.status(500).json({ message: err.message})
    })
})


    
    //Get users by id
    server.get('/api/users/:id', (req,res)=>{
        console.log("IAM HERE",req.params.id)
        Mod.findById(req.params.id)
    .then(mod => {
       if (mod) { res.status(200).json(mod)
    }else{
        console.log("Thiis is the else")
        res.status(404).json({ message: "Not Found"})
    }
    })
    .catch(err=>{
        res.status(500).json({ message: err.message })
    } )
})

//posting new user to server
server.post('/api/users', (req, res)=> {
    const newMod = req.body
    if(!newMod.name || !newMod.bio){
        res.status(400).json({message: "Please provide name and bio for the user" })
    }else{
    Mod.insert(newMod)
    .then(mod => { if(mod) {res.status(201).json(mod)}
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message})
    })
}
})

//Deleting users
server.delete('/api/users/:id', (req,res) => {
    Mod.remove(req.params.id)
    .then(mod => {
        if (mod) {
            res.status(200).json(mod)
        }else{
            res.status(404).json({
                message: `mod ${res.params.id} not real!!`
            })
        }
    })
     .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
