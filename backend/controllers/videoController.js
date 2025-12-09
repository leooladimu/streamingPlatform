import Video from '../models/Video.js';
import User from '../models/User.js';

// @desc    Get all videos with filtering and pagination
// @route   GET /api/videos
// @access  Public
export const getVideos = async (req, res) => {
  try {
    const { genre, search, page = 1, limit = 20, sort = '-createdAt' } = req.query;
    
    const query = {};
    
    if (genre) {
      query.genre = genre;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    const videos = await Video.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Video.countDocuments(query);

    res.json({
      videos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (video) {
      // Increment view count
      video.views += 1;
      await video.save();
      
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured videos
// @route   GET /api/videos/featured
// @access  Public
export const getFeaturedVideos = async (req, res) => {
  try {
    const videos = await Video.find({ featured: true }).limit(10);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get trending videos
// @route   GET /api/videos/trending
// @access  Public
export const getTrendingVideos = async (req, res) => {
  try {
    const videos = await Video.find({ trending: true })
      .sort('-views')
      .limit(20);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get videos by genre
// @route   GET /api/videos/genre/:genre
// @access  Public
export const getVideosByGenre = async (req, res) => {
  try {
    const videos = await Video.find({ genre: req.params.genre })
      .sort('-views')
      .limit(20);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add video to watch history
// @route   POST /api/videos/:id/watch
// @access  Private
export const addToWatchHistory = async (req, res) => {
  try {
    const { progress, completed } = req.body;
    const user = await User.findById(req.user._id);
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if video already in watch history
    const existingIndex = user.watchHistory.findIndex(
      item => item.video.toString() === req.params.id
    );

    if (existingIndex > -1) {
      // Update existing entry
      user.watchHistory[existingIndex].progress = progress || user.watchHistory[existingIndex].progress;
      user.watchHistory[existingIndex].completed = completed || user.watchHistory[existingIndex].completed;
      user.watchHistory[existingIndex].watchedAt = Date.now();
    } else {
      // Add new entry
      user.watchHistory.unshift({
        video: req.params.id,
        progress: progress || 0,
        completed: completed || false
      });
    }

    await user.save();
    res.json({ message: 'Added to watch history' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add/Remove video from my list
// @route   POST /api/videos/:id/mylist
// @access  Private
export const toggleMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const videoId = req.params.id;

    const index = user.myList.indexOf(videoId);

    if (index > -1) {
      // Remove from list
      user.myList.splice(index, 1);
      await user.save();
      res.json({ message: 'Removed from My List', inList: false });
    } else {
      // Add to list
      user.myList.push(videoId);
      await user.save();
      res.json({ message: 'Added to My List', inList: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new video (admin)
// @route   POST /api/videos
// @access  Private/Admin
export const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
