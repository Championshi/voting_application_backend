// const express = require('express')
// const app = express();
// require('dotenv').config();


// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000;



// app.listen(PORT,()=>{
//     console.log('listening on port 3000');
// })
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const cookieParser = require('cookie-parser');


// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json());
//cookies
app.use(cookieParser());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes);

app.get('/', (req, res) => {
  res.send('Voting Application is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
