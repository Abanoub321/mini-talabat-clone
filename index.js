const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const menuRoutes = require('./src/routes/menuRoute');
const orderRoute = require('./src/routes/orderRoute');
const resturantRoutes = require('./src/routes/resturantRouter');
const userRoute = require('./src/routes/userRoute');
const app = express();
const port = process.env.PORT;


app.use(express.urlencoded({extended:true}));
app.use(express.json());


mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},()=> console.log('Connected To database'));




app.use('/api/restaurant',resturantRoutes)
app.use('/api/menu',menuRoutes)
app.use('/api/user',userRoute);
app.use('/api/order',orderRoute);

app.listen(port, () => console.log(`Listnening to port ${port}`))