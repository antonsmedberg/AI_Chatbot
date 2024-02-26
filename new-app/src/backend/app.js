require('dotenv').config(); // First line, load environment variables
import express, { json } from 'express';

import { join } from 'path';
import helmet from 'helmet'; // Security middleware

const app = express();
const port = process.env.PORT || 3001;

// Apply Helmet for security
app.use(helmet());

// Body parser middleware to parse JSON bodies
app.use(json());

// Serve static files from the React app build directory
app.use(express.static(join(__dirname, 'build')));


// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


