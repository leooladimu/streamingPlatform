import express from 'express';
import { getRecommendations, getSimilarVideos } from '../controllers/recommendationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getRecommendations);
router.get('/similar/:id', getSimilarVideos);

export default router;
