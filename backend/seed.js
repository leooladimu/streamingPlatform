import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';

dotenv.config();

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
  {
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_8mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800',
    duration: 2400,
    genre: 'Sci-Fi',
    releaseYear: 2019,
    rating: 'TV-PG',
    cast: ['Pedro Pascal', 'Carl Weathers', 'Gina Carano'],
    director: 'Jon Favreau',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_8mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_8mb.mp4' }
    ]
  },
  {
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_9mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
    duration: 4200,
    genre: 'Thriller',
    releaseYear: 2017,
    rating: 'TV-MA',
    cast: ['Álvaro Morte', 'Úrsula Corberó', 'Itziar Ituño'],
    director: 'Álex Pina',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_9mb.mp4' }
    ],
    trending: true
  },
  {
    title: 'Avatar: The Last Airbender',
    description: 'In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
    duration: 1440,
    genre: 'Fantasy',
    releaseYear: 2005,
    rating: 'TV-Y',
    cast: ['Zach Tyler Eisen', 'Mae Whitman', 'Jack DeSena'],
    director: 'Michael Dante DiMartino',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4' }
    ]
  },
  {
    title: 'Dark',
    description: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the secrets of four families.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_11mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800',
    duration: 3600,
    genre: 'Sci-Fi',
    releaseYear: 2017,
    rating: 'TV-MA',
    cast: ['Louis Hofmann', 'Karoline Eichhorn', 'Lisa Vicari'],
    director: 'Baran bo Odar',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_11mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_11mb.mp4' }
    ]
  },
  {
    title: 'The Office',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_12mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800',
    duration: 1320,
    genre: 'Comedy',
    releaseYear: 2005,
    rating: 'TV-14',
    cast: ['Steve Carell', 'John Krasinski', 'Jenna Fischer'],
    director: 'Greg Daniels',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_12mb.mp4' }
    ]
  },
  {
    title: 'Friends',
    description: 'Follows the personal and professional lives of six twenty to thirty year-old friends living in Manhattan.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_13mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    duration: 1320,
    genre: 'Comedy',
    releaseYear: 1994,
    rating: 'TV-14',
    cast: ['Jennifer Aniston', 'Courteney Cox', 'Lisa Kudrow'],
    director: 'David Crane',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_13mb.mp4' }
    ]
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_14mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    duration: 10140,
    genre: 'Sci-Fi',
    releaseYear: 2014,
    rating: 'PG-13',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_14mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_14mb.mp4' }
    ]
  },
  {
    title: 'Peaky Blinders',
    description: 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_15mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    duration: 3600,
    genre: 'Drama',
    releaseYear: 2013,
    rating: 'TV-MA',
    cast: ['Cillian Murphy', 'Paul Anderson', 'Helen McCrory'],
    director: 'Steven Knight',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_15mb.mp4' }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing videos
    await Video.deleteMany({});
    console.log('Cleared existing videos');

    // Insert sample videos
    const videos = await Video.insertMany(sampleVideos);
    console.log(`✅ Successfully seeded ${videos.length} videos`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`- Featured videos: ${videos.filter(v => v.featured).length}`);
    console.log(`- Trending videos: ${videos.filter(v => v.trending).length}`);
    console.log('\nGenres:');
    const genres = {};
    videos.forEach(v => {
      genres[v.genre] = (genres[v.genre] || 0) + 1;
    });
    Object.entries(genres).forEach(([genre, count]) => {
      console.log(`  - ${genre}: ${count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
