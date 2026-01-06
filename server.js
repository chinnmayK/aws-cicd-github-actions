const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>DevTrack</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: #e5e7eb;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          h1 {
            font-size: 3rem;
          }
        </style>
      </head>
      <body>
        <h1>🚀 DevTrack is Live</h1>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`DevTrack web app running on port ${PORT}`);
});
