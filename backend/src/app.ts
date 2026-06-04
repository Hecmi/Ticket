import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import { runSeed } from '../seed';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      await runSeed();
    } catch (err) {
      console.error('Error during automatic seeding:', err);
    }
  });
}

export default app;
