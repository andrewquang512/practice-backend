const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const UserRoutes = require('./routes/users');

connectDB();

app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

app.use('/api/users', UserRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
