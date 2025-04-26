// server.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nftRoutes = require("./routes/nftRoutes");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());    
app.use(bodyParser.json());


app.use("/api/nft", nftRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
