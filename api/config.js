// Vercel Serverless Function to securely expose Environment Variables
export default function handler(req, res) {
  res.status(200).json({
    TMDB_KEY: process.env.TMDB_KEY,
    GEMINI_KEY: process.env.GEMINI_KEY,
  });
}
