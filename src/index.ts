import express from 'express';
import { searchArticles } from './search';

const PORT = 5100;

const app = express();

app.get('/', async (req, res) => {
  const result = await searchArticles('都合', 'すける', '頑張れ', 'しゃっか', 'けいかん');
  res.send(`Hello World! ${result.length}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
