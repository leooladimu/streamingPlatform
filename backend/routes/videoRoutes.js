import express from 'express';
import {
  getVideos,
  getVideo,
  getFeaturedVideos,
  getTrendingVideos,
  getVideosByGenre,
  addToWatchHistory,
  toggleMyList,
  createVideo
} from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getVideos).post(protect, createVideo);
router.get('/featured', getFeaturedVideos);
router.get('/trending', getTrendingVideos);
router.get('/genre/:genre', getVideosByGenre);
router.get('/:id', getVideo);
router.post('/:id/watch', protect, addToWatchHistory);
router.post('/:id/mylist', protect, toggleMyList);

export default router;
