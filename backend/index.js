import dotenv from "dotenv";
import express from "express";
import apifyRoutes from "./src/routes/route.js";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

// Manual CORS - this will definitely work
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('Request from origin:', origin);
  
  // Always set CORS headers for Vercel domains and localhost
  if (!origin || origin.includes('.vercel.app') || origin.includes('localhost')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log('CORS headers set for:', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }
  
  next();
});



app.use("/api", apifyRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});