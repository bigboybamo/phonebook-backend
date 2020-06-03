const express = require('express');
let morgan = require('morgan');

let app = express();
app.use(express.json());
app.use(morgan('tiny'));

let phonebook = [

{
    name: "Olabamiji Oyetubo",
    number : "08123577720",
    id: 1
},
{
    name: "Ann Effiong",
    number :"0863456789",
    id: 2

},

{
    name: "Jerry Smith",
    number : "081233576720",
    id: 3
},
{
    name: "Connie Springer",
    number : "0986523467",
    id: 4

},
{

  name : "Eren jeager",
  number : '6789998212',
  id: 5
}
]

app.get('/api/persons',(req,res)=>{

res.json(phonebook);

})

app.get('/info',(req,res)=>{

    const count = phonebook.length;
    const d = new Date();

    console.log(count);
    res.send(`The phonebook has info for ${count} people
   the time this current book was generated was ${d} `)
    
})

app.get('/api/persons/:id',(req,res)=>{
const id = Number(req.params.id);
const person = phonebook.find( person=> person.id == id );

if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id',(req,res)=>{

    const id = Number(req.params.id)
  notes = phonebook.filter(note => note.id !== id)

  res.status(204).end()
})



  app.post('/api/persons',(req,res)=>{

    const part = req.body

  if (part.name === undefined){
    return res.status(400).json({
        error: "name missing"
      });
  }

  if(part.number === undefined){
    return res.status(400).json({
        error: "number missing"
      });
  }
  
 


  const person = {
    name: part.name,
    number: part.number,
    id: Math.floor(Math.random() * 100000)
  };

phonebook = phonebook.concat(person);
console.log(person)
res.json(person);

  })

const port = 3001;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});

