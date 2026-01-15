import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

// Import the sample videos from seed.js
// We'll need to export them from seed.js first
const sampleVideos = [
  {
    title: 'Dog Adventures in the Livingroom',
    description: 'Watch our puppy trying to walk!',
    videoUrl: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273395/-5555928177450095242_qjvxuc.mp4', 
    thumbnail: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273395/-5555928177450095242_qjvxuc.jpg',
    duration: 6, 
    genre: 'Pets',
    releaseYear: 2026,
    rating: 'G',
    cast: ['Penny'],
    director: 'Leo Oladimu',
    quality: [
      { resolution: '720p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273395/-5555928177450095242_qjvxuc.mp4' }
    ],
    featured: true,
    trending: true
  },
  {
    title: 'Government Atrocity',
    description: 'USP Lewisburg',
    videoUrl: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273872/IMG_1289_yqwarr.mp4',
    thumbnail: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273872/IMG_1289_yqwarr.jpg',
    duration: 10,
    genre: 'Pets',
    releaseYear: 2026,
    rating: 'G',
    cast: ['Dog'],
    director: 'Leo Oladimu',
    quality: [
      { resolution: '720p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273872/IMG_1289_yqwarr.mp4' }
    ],
    featured: true,
    trending: true
  },
  {
    title: 'Balmy Boston Spring',
    description: 'A bike ride home from work in the Bean.',
    videoUrl: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.mp4',
    thumbnail: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.jpg',
    duration: 8,
    genre: 'Drama',
    releaseYear: 2021,
    rating: 'TV-MA',
    cast: ['Leo Ọládimú'],
    director: 'Leo Ọládimú',
    quality: [
      { resolution: '720p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.mp4' },
      { resolution: '1080p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.mp4' }
    ],
    trending: true
  },
  {
    title: 'Alley Cat Race, PO Square, Boston, MA',
    description: 'Cars suck!',
    videoUrl: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.mp4',
    thumbnail: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.jpg',
    duration: 8880,
    genre: 'Action',
    releaseYear: 2010,
    rating: 'PG-13',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    director: 'Leo Ọládimú',
    quality: [
      { resolution: '720p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.mp4' },
      { resolution: '1080p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.mp4' }
    ]
  },
  {
    title: 'Bike Messengers of Justice',
    description: 'Fixies are the best!',
    videoUrl: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768274105/IMG_2444_aajt0o.mp4',
    thumbnail: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768274105/IMG_2444_aajt0o.jpg',
    duration: 11,
    genre: 'Sci-Fi',
    releaseYear: 2023,
    rating: 'TV-MA',
    cast: ['Nat Rosevear', 'Cristin Milioti', 'Jimmi Simpson'],
    director: 'Charlie Brooker',
    quality: [
      { resolution: '720p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768274105/IMG_2444_aajt0o.mp4' }
    ],
    trending: true
  },
  {
    title: 'Heather Heyer Way',
    description: "Heather's mom said that if you're not outraged, you're not paying attention.",
    videoUrl: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273801/IMG_1313_e7hien.mp4',
    thumbnail: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273801/IMG_1313_e7hien.jpg',
    duration: 6,
    genre: 'Drama',
    releaseYear: 2023,
    rating: 'TV-MA',
    cast: ['Leo Ọládimú', 'Cleopatra Ọládimú'],
    director: 'Leo Ọládimú',
    quality: [
      { resolution: '720p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273801/IMG_1313_e7hien.mp4' },
      { resolution: '1080p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273801/IMG_1313_e7hien.mp4' }
    ]
  },
  {
    title: 'Lynching Museum, Montgomery, Alabama',
    description: "The National Memorial for Peace and Justice is the nation's first memorial dedicated to the legacy of enslaved Black people and victims of racial terror lynching.",
    videoUrl: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.mp4',
    thumbnail: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.jpg',
    duration: 4,
    genre: 'Drama',
    releaseYear: 2022,
    rating: 'TV-MA',
    cast: ['Leo Ọládimú', 'Cleopatra Ọládimú'],
    director: 'Leo Ọládimú',
    quality: [
      { resolution: '720p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.mp4' },
      { resolution: '1080p', url: 'https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.mp4' }
    ],
    featured: true,
    trending: true
  },
  // Add remaining placeholder videos...
];

// Admin endpoint to seed database
// Add a secret key to prevent unauthorized access
router.post('/seed', async (req, res) => {
  try {
    const { secretKey } = req.body;
    
    // Simple secret key check (you should use environment variable)
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Clear existing videos
    await Video.deleteMany({});
    
    // Insert sample videos
    const videos = await Video.insertMany(sampleVideos);
    
    res.json({
      message: 'Database seeded successfully',
      count: videos.length,
      videos: videos.map(v => ({ title: v.title, genre: v.genre }))
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

export default router;
