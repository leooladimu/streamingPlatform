import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  videoUrl: {
    type: String,
    required: [true, 'Please add a video URL']
  },
  thumbnail: {
    type: String,
    required: [true, 'Please add a thumbnail']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in seconds']
  },
  genre: [{
    type: String,
    required: true,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy', 'Pets']
  }],
  cast: [String],
  director: String,
  releaseYear: {
    type: Number,
    required: true
  },
  rating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-PG', 'TV-14', 'TV-MA'],
    default: 'PG-13'
  },
  quality: [{
    resolution: {
      type: String,
      enum: ['360p', '480p', '720p', '1080p', '4K']
    },
    url: String
  }],
  subtitles: [{
    language: String,
    url: String
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search and recommendations
videoSchema.index({ title: 'text', description: 'text' });
videoSchema.index({ genre: 1, views: -1 });

const Video = mongoose.model('Video', videoSchema);

export default Video;
