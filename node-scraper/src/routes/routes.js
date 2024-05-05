import express from 'express';
import { crawler  } from '../controllers/crawlerController.js';
import { middlewareInfo, middlewareToken } from '../middlewares/middleware.js';

const router = express.Router();

router.post('/', middlewareInfo, middlewareToken, crawler);

export default router;