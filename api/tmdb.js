export default async function handler(req, res) {
  const { query, id } = req.query;
  const apiKey = process.env.TMDB_KEY;
  const baseUrl = '[https://api.themoviedb.org/3](https://api.themoviedb.org/3)';

  if (!apiKey) {
    return res.status(500).json({ error: 'TMDB_KEY is missing in Vercel Env Vars' });
  }

  try {
    let url;
    if (id) {
        // Fetch details
        url = `${baseUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits`;
    } else if (query) {
        // Search
        url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    } else {
        return res.status(400).json({ error: 'Missing query or id parameter' });
    }

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
