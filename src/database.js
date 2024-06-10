const mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/taskstraker')
mongoose.connect('mongodb://0.0.0.0:27017/api-taskstraker')

    .then(() => console.log('🌟 Database is Connected'))
    .catch(err => console.error('❌ Error connecting to the database:', err));