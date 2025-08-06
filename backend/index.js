import dotenv from "dotenv";
import express from "express";
import apifyRoutes from "./src/routes/route.js";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

// Updated CORS configuration
const allowedOrigins = [
   'apify-dashboard-git-production-revanthb007s-projects.vercel.app',
    /.*\.vercel\.app$/, // Allow all Vercel subdomains
  'http://localhost:3000', // for local development
  'http://localhost:5173', // for Vite dev server
  // Add your custom domain here if you have one
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin); // For debugging
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use("/api", apifyRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});