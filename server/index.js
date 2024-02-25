const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')

const app = express();

// MongoDB connect
const MONGO_PATH = 'mongodb://127.0.0.1:27017/'
mongoose.connect(MONGO_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established'))
.catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(cors());

const User = require('./models/User');
const userRoutes = require('./routes/userRoute');
app.use('/api/users', userRoutes);

const Chat = require('./models/Chat');
const chatRoutes = require('./routes/chatRoute');
app.use('/api/chats', chatRoutes);

const Logkeeper = require('./models/Logkeeper');
const logkeeperRoutes = require('./routes/logkeeperRoute');
app.use('/api/logkeepers', logkeeperRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Hello , world!');
});

const saltRounds = 10;
app.post('/register', async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const user = new User({ username: req.body.username, hash_password: hashedPassword });
      await user.save();
      res.status(201).send('User created');
  } catch (error) {
      res.status(500).send('Error creating the user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
          res.redirect('/hello');
      } else {
          res.status(400).send('Wrong username or password!');
      }
  } else {
      res.status(400).send('Wrong username or password!');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
