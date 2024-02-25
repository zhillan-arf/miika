const express = require('express');
const app = express();
const PORT = 3001;

// Routes
app.get('/', (req, res) => {
  res.send('Hello , world!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Schema

