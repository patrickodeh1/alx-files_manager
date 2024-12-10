import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Load routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
