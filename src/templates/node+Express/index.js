const express = require('express');
const app = express();
const PORT = 7000;
const mongoose = require('mongoose');
app.use(express.json());

app.delete("/movie", async (req, res) => {
  try {
    
    await Movie.deleteMany({});
    res.status(200).json({ msg: "All data deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error occurred" });
  }
});

mongoose
  .connect('mongodb://127.0.0.1:27017/mongo')
  .then(() => {
    console.log('connected');
  })
  .catch((err) => console.log(err));

const movieSchema = new mongoose.Schema({
  movie_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  actors: {
    name: [String],
  },
});
const Movie = new mongoose.model('movie', movieSchema);
const theaterSchema = new mongoose.Schema({
  theater_id: {
    type: Number,
    unique: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  seating: {
    type: Number,
    required: true,
  },
});

const Theater = new mongoose.model('theater_id', theaterSchema);

//user collections
const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  loyalty_points: {
    type: Number,
  },
});



const User = new mongoose.model('user', userSchema);


//operations
app.post('/movie', async function (req, res) {
  const body = req.body;
  if (
    !body ||
    !body.name ||
    !body.genre ||
    !body.release_year ||
    !body.duration ||
    !body.ratings ||
    !body.actors
  ) {
    return res.status(400).json({ msg: 'all field required' });
  }
  try {
    const result = await Movie.create({
      movie_id: body.movie_id,
      name: body.name,
      genre: body.genre,
      release_year: body.release_year,
      duration: body.duration,
      ratings: body.ratings,
      actors: body.actors,
    });
    console.log(result);
    return res.status(201).json({ msg: 'movie created' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error occurred while creating user' });
  }
});

app.get('/movies',async(req,res)=>{
  try{const movie = await Movie.find({});
  return res.status(201).json(movie);
}catch{
  res.status(500).json({msg:"error occured"})
}

})
app.post('/user', function(req, res){
  const body = req.body;
  if (
    !body||
    !body.userId ||
    !body.name ||
    !body.email ||
    !body.age ||
    !body.loyalty_points
  ) {
    return res.status(400).json({ msg: ' all fields are required' });
  }

  try {
    const result = User.create({
      userId: body.userId,
      name: body.name,
      email: body.email,
      dob: body.dob,
      loyalty_points: body.loyalty_points,
    });
    console.log(result);
    return res.status(201).json({ msg: 'user entered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'data not sent' });
  }
});



app.post('/theater',(req,res)=>{
  const body = req.body;
  if(
    !body ||
    !body.theater_id ||
    !body.location ||   
    !body.seating 
  ){
   res.status(400).json({msg:"all fields are required"}) 
  }
  const allFields ={
    theater_id: body.theater_id,
    location: body.location,
    state: body.state,
    country: body.country,
    seating: body.seating,
  }

  try {
      Theater.create(allFields);
  console.log(allFields);
  return res.status(201).json({msg:"fields entered"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"data not entered"})
  }

})



app.get('/',(req,res)=>{
  res.send("hello")
})




app.listen(PORT, function () {
  console.log('listening');
});
