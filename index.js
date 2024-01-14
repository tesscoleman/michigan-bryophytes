import app from "./server.js";
import mongoose from "mongoose";
import 'dotenv/config'


const db_username = process.env.DATABASE_USER;
const db_password = process.env.DATABASE_PASSWORD;
const db_cluster = process.env.DATABASE_CLUSTER;
const db_name = process.env.DATABASE_NAME;

const uri = `mongodb+srv://${db_username}:${db_password}@${db_cluster}.vbsw3mu.mongodb.net/${db_name}?retryWrites=true&w=majority`;


mongoose.connect(uri, {
  useNewUrlParser: true,
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    console.log('connected to MongoDb')
  })