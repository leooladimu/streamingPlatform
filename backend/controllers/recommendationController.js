import Video from '../models/Video.js';
import User from '../models/User.js';

// Simple collaborative filtering based on watch history and preferences
export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watchHistory.video');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's watched video IDs
    const watchedVideoIds = user.watchHistory.map(item => item.video._id.toString());
    
    // Get user's favorite genres from preferences or watched videos
    let favoriteGenres = user.preferences.favoriteGenres || [];
    
    if (favoriteGenres.length === 0) {
      // Extract genres from watch history
      const genreCounts = {};
      user.watchHistory.forEach(item => {
        if (item.video && item.video.genre) {
          item.video.genre.forEach(genre => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          });
        }
      });
      
      // Get top 3 genres
      favoriteGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([genre]) => genre);
    }

    // Find similar users (users who watched same videos)
    const similarUsers = await User.find({
      _id: { $ne: user._id },
      'watchHistory.video': { $in: watchedVideoIds }
    }).populate('watchHistory.video');

    // Get videos watched by similar users
    const recommendedVideoIds = new Set();
    similarUsers.forEach(simUser => {
      simUser.watchHistory.forEach(item => {
        const videoId = item.video._id.toString();
        if (!watchedVideoIds.includes(videoId)) {
          recommendedVideoIds.add(videoId);
        }
      });
    });

    // Get recommended videos
    let recommendations = await Video.find({
      _id: { $in: Array.from(recommendedVideoIds) }
    }).limit(10);

    // If not enough recommendations, add popular videos from favorite genres
    if (recommendations.length < 10) {
      const genreVideos = await Video.find({
        genre: { $in: favoriteGenres },
        _id: { $nin: [...watchedVideoIds, ...Array.from(recommendedVideoIds)] }
      })
      .sort('-views')
      .limit(10 - recommendations.length);
      
      recommendations = [...recommendations, ...genreVideos];
    }

    // If still not enough, add trending videos
    if (recommendations.length < 10) {
      const trendingVideos = await Video.find({
        _id: { $nin: [...watchedVideoIds, ...recommendations.map(v => v._id.toString())] }
      })
      .sort('-views')
      .limit(10 - recommendations.length);
      
      recommendations = [...recommendations, ...trendingVideos];
    }

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recommendations for a specific video (similar videos)
export const getSimilarVideos = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Find videos with matching genres
    const similarVideos = await Video.find({
      _id: { $ne: video._id },
      genre: { $in: video.genre }
    })
    .sort('-views')
    .limit(12);

    res.json(similarVideos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
