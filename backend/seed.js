import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';

dotenv.config();

const sampleVideos = [
  {
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800',
    duration: 3600,
    genre: 'Sci-Fi',
    releaseYear: 2016,
    rating: 'TV-14',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    director: 'The Duffer Brothers',
    quality: [
      { resolution: '360p', url: 'https://sample-videos.com/video123/mp4/360/big_buck_bunny_360p_1mb.mp4' },
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_1mb.mp4' }
    ],
    subtitles: [
      { language: 'English', url: 'https://example.com/subtitles/en.vtt' },
      { language: 'Spanish', url: 'https://example.com/subtitles/es.vtt' }
    ],
    featured: true,
    trending: true
  },
  {
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800',
    duration: 3300,
    genre: 'Fantasy',
    releaseYear: 2019,
    rating: 'TV-MA',
    cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
    director: 'Lauren Schmidt Hissrich',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_2mb.mp4' }
    ],
    featured: true,
    trending: true
  },
  {
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    duration: 2820,
    genre: 'Drama',
    releaseYear: 2008,
    rating: 'TV-MA',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    director: 'Vince Gilligan',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_3mb.mp4' }
    ],
    trending: true
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_4mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    duration: 8880,
    genre: 'Action',
    releaseYear: 2010,
    rating: 'PG-13',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    director: 'Christopher Nolan',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_4mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_4mb.mp4' }
    ]
  },
  {
    title: 'Black Mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations clash with darkest instincts.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1574267432644-f74f5841e8a3?w=800',
    duration: 3000,
    genre: 'Sci-Fi',
    releaseYear: 2011,
    rating: 'TV-MA',
    cast: ['Jesse Plemons', 'Cristin Milioti', 'Jimmi Simpson'],
    director: 'Charlie Brooker',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4' }
    ],
    trending: true
  },
  {
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_6mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    duration: 3600,
    genre: 'Drama',
    releaseYear: 2016,
    rating: 'TV-MA',
    cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
    director: 'Peter Morgan',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_6mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_6mb.mp4' }
    ]
  },
  {
    title: 'Squid Game',
    description: 'Hundreds of cash-strapped contestants accept an invitation to compete in children\'s games for a tempting prize, but the stakes are deadly.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_7mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800',
    duration: 3240,
    genre: 'Thriller',
    releaseYear: 2021,
    rating: 'TV-MA',
    cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-joon'],
    director: 'Hwang Dong-hyuk',
    quality: [
      { resolution: '720p', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_7mb.mp4' },
      { resolution: '1080p', url: 'https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_7mb.mp4' }
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
