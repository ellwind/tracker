import dotenv from 'dotenv';
import express, { Express } from 'express';
import ejs from 'ejs';

dotenv.config();

const { HTML_PORT } = process.env;

const app: Express = express();
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.engine('js', ejs.renderFile);

app.get('/', (req, res) => {
  res.render('index.html');
});
app.get('/1.html', (req, res) => {
  res.render('index.html');
});
app.get('/2.html', (req, res) => {
  res.render('index.html');
});
app.get('/tracker.js', (req, res) => {
  res.render('tracker.js');
});

app.listen(HTML_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${HTML_PORT}`
  );
});
