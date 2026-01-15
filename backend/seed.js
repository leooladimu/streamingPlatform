import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";

dotenv.config();

const sampleVideos = [
  {
    title: "Dog Adventures in the Livingroom",
    description: "Watch our puppy trying to walk!",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273395/-5555928177450095242_qjvxuc.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273395/-5555928177450095242_qjvxuc.jpg",
    duration: 6,
    genre: "Pets",
    releaseYear: 2026,
    rating: "G",
    cast: ["Penny"],
    director: "Leo Oladimu",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273395/-5555928177450095242_qjvxuc.mp4",
      },
    ],
    featured: true,
    trending: true,
  },
  {
    title: "Bike Polo!",
    description: "Bike Polo Tournament, Boston, MA",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372825/IMG_2161_zvqe67.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372825/IMG_2161_zvqe67.jpg",
    duration: 17,
    genre: "Drama",
    releaseYear: 2022,
    rating: "G",
    cast: ["Cyclists"],
    director: "Leo Oladimu",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372825/IMG_2161_zvqe67.mp4",
      },
    ],
    featured: true,
    trending: true,
  },
  {
    title: "Balmy Boston Spring",
    description: "A bike ride home from work in the Bean.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.jpg",
    duration: 8,
    genre: "Drama",
    releaseYear: 2021,
    rating: "TV-MA",
    cast: ["Leo Ọládimú"],
    director: "Leo Ọládimú",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.mp4",
      },
      {
        resolution: "1080p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273681/IMG_2852_amhtnx.mp4",
      },
    ],
    trending: true,
  },
  {
    title: "Alley Cat Race",
    description: "Cars suck!",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.jpg",
    duration: 8880,
    genre: "Action",
    releaseYear: 2010,
    rating: "PG-13",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    director: "Leo Ọládimú",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.mp4",
      },
      {
        resolution: "1080p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273979/IMG_1777_hekisz.mp4",
      },
    ],
  },
  {
    title: "Bike Messengers of Justice",
    description: "Fixies are the best!",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768274105/IMG_2444_aajt0o.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768274105/IMG_2444_aajt0o.jpg",
    duration: 11,
    genre: "Sci-Fi",
    releaseYear: 2023,
    rating: "TV-MA",
    cast: ["Nat Rosevear", "Cristin Milioti", "Jimmi Simpson"],
    director: "Charlie Brooker",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768274105/IMG_2444_aajt0o.mp4",
      },
    ],
    trending: true,
  },
  {
    title: "Heather Heyer Way",
    description:
      "Heather's mom said that if you're not outraged, you're not paying attention.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371438/IMG_1311_as50c5.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371438/IMG_1311_as50c5.jpg",
    duration: 6,
    genre: "Drama",
    releaseYear: 2023,
    rating: "TV-MA",
    cast: ["Leo Ọládimú", "Cleopatra Ọládimú"],
    director: "Leo Ọládimú",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371438/IMG_1311_as50c5.mp4",
      },
      {
        resolution: "1080p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371438/IMG_1311_as50c5.mp4",
      },
    ],
  },
  {
    title: "Montgomery, Alabama",
    description:
      "The National Memorial for Peace and Justice is the nation's first memorial dedicated to the legacy of enslaved Black people and victims of racial terror lynching.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.jpg",
    duration: 4,
    genre: "Drama",
    releaseYear: 2022,
    rating: "TV-MA",
    cast: ["Leo Ọládimú", "Cleopatra Ọládimú"],
    director: "Leo Ọládimú",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.mp4",
      },
      {
        resolution: "1080p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768273552/IMG_1325_xovpz8.mp4",
      },
    ],
    featured: true,
    trending: true,
  },
  {
    title: "Moonshine in 29",
    description:
      "The adventures of a master moonshiner in his first month in California.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372750/IMG_1383_latdhc.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372750/IMG_1383_latdhc.jpg",
    duration: 13,
    genre: "Drama",
    releaseYear: 2023,
    rating: "TV-PG",
    cast: ["Leo Ọládimú"],
    director: "Jon Favreau",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372750/IMG_1383_latdhc.mp4",
      },
      {
        resolution: "1080p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372750/IMG_1383_latdhc.mp4",
      },
    ],
  },
  {
    title: "Diesel Dreams: Local 534",
    description:
      "While installing an epoxy floor system at the new Moderna HQ in Cambridge, I saw the biggest diesel engine I've ever seen. Moderna has a well-publicized commercial relationship with Israel, as Israel purchased millions of doses of its COVID-19 vaccine, so the CAT connection will shock no one.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372683/IMG_2416_bz31jb.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372683/IMG_2416_bz31jb.jpg",
    duration: 23,
    genre: "Thriller",
    releaseYear: 2022,
    rating: "TV-MA",
    cast: ["Leo Ọládimú"],
    director: "Álex Pina",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372683/IMG_2416_bz31jb.mp4",
      },
    ],
    trending: true,
  },
  {
    title: "The Hut: Winter in Brookline",
    description: "A hut in Brookline, MA.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372573/IMG_3067_hpr8ww.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372573/IMG_3067_hpr8ww.jpg",
    duration: 15,
    genre: "Fantasy",
    releaseYear: 2021,
    rating: "TV-Y",
    cast: ["Leo Ọládimú"],
    director: "Michael Dante DiMartino",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372573/IMG_3067_hpr8ww.mp4",
      },
    ],
  },
  {
    title: "Penny's Pillow",
    description: "A puppy has a flipout on a pillow.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372424/-2116784034171708971_csw9cw.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372424/-2116784034171708971_csw9cw.jpg",
    duration: 19,
    genre: "Sci-Fi",
    releaseYear: 2021,
    rating: "TV-MA",
    cast: ["Penny Ọládimú"],
    director: "Leo Ọládimú",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372424/-2116784034171708971_csw9cw.mp4",
      },
      {
        resolution: "1080p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372424/-2116784034171708971_csw9cw.mp4",
      },
    ],
  },
  {
    title: "Brookline Nights",
    description: "From a monastery in Brookline, Mass.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372413/IMG_3069_fh7poo.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372413/IMG_3069_fh7poo.jpg",
    duration: 11,
    genre: "Comedy",
    releaseYear: 2021,
    rating: "TV-14",
    cast: ["Leo Ọládimú", "Cleopatra Ọládimú"],
    director: "Greg Daniels",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372413/IMG_3069_fh7poo.mp4",
      },
    ],
  },
  {
    title: "Gregory",
    description:
      "Follows the personal and professional life of a young pitbull in Brookline, MA.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372367/IMG_3265_kbywxf.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372367/IMG_3265_kbywxf.jpg",
    duration: 32,
    genre: "Comedy",
    releaseYear: 2021,
    rating: "TV-14",
    cast: ["Gregory"],
    director: "David Crane",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372367/IMG_3265_kbywxf.mp4",
      },
    ],
  },
  {
    title: "Red Kitchen",
    description: "A squad of communists forages for food in Brighton, Mass.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372126/IMG_3389_euq28g.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372126/IMG_3389_euq28g.jpg",
    duration: 11,
    genre: "Sci-Fi",
    releaseYear: 2021,
    rating: "PG-13",
    cast: ["Nat Rosevear", "Cristin Milioti", "Jimmi Simpson"],
    director: "Christopher Nolan",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372126/IMG_3389_euq28g.mp4",
      },
      {
        resolution: "1080p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372126/IMG_3389_euq28g.mp4",
      },
    ],
  },
  {
    title: "Kelso 21",
    description: "A gangster family epic set in the lower Mojave Desert.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372051/IMG_1349_koxthi.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372051/IMG_1349_koxthi.jpg",
    duration: 6,
    genre: "Drama",
    releaseYear: 2021,
    rating: "TV-MA",
    cast: ["Leo Ọládimú", "Cleopatra Ọládimú"],
    director: "Steven Knight",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768372051/IMG_1349_koxthi.mp4",
      },
    ],
  },
  {
    title: "Dirty Texas",
    description: "A gangster family epic set in the Texas state prison system.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371957/8C1C2858-D2CB-4BA1-8D66-D7EE3EB87BFE_po4vru.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371957/8C1C2858-D2CB-4BA1-8D66-D7EE3EB87BFE_po4vru.jpg",
    duration: 14,
    genre: "Drama",
    releaseYear: 2021,
    rating: "TV-MA",
    cast: ["Dirty Rivas"],
    director: "Steven Knight",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371957/8C1C2858-D2CB-4BA1-8D66-D7EE3EB87BFE_po4vru.mp4",
      },
    ],
  },
  {
    title: "Brookline Shine II",
    description: "A moonshiner in Boston's flashiest neighborhood, twice.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371779/IMG_0662_mjslyu.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371779/IMG_0662_mjslyu.jpg",
    duration: 11,
    genre: "Drama",
    releaseYear: 2021,
    rating: "TV-MA",
    cast: ["Leo Ọládimú"],
    director: "Steven Knight",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371779/IMG_0662_mjslyu.mp4",
      },
    ],
  },
  {
    title: "Nativity, 2022",
    description: "Nativity vigil at the Holy Transfiguration Monastery.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371558/IMG_0056_dimejn.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371558/IMG_0056_dimejn.jpg",
    duration: 10,
    genre: "Drama",
    releaseYear: 2022,
    rating: "TV-MA",
    cast: ["Leo Ọládimú"],
    director: "Steven Knight",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371558/IMG_0056_dimejn.mp4",
      },
    ],
  },
  {
    title: "Chris's First Fight",
    description: "A friend from my union in his first amateur fight.",
    videoUrl:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371163/5590223084922228215_egpfpt.mp4",
    thumbnail:
      "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371163/5590223084922228215_egpfpt.jpg",
    duration: 32,
    genre: "Drama",
    releaseYear: 2022,
    rating: "TV-MA",
    cast: ["Leo Ọládimú"],
    director: "Steven Knight",
    quality: [
      {
        resolution: "720p",
        url: "https://res.cloudinary.com/di4vcvgtk/video/upload/v1768371163/5590223084922228215_egpfpt.mp4",
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for seeding...");

    // Clear existing videos
    await Video.deleteMany({});
    console.log("Cleared existing videos");

    // Insert sample videos
    const videos = await Video.insertMany(sampleVideos);
    console.log(`✅ Successfully seeded ${videos.length} videos`);

    // Display summary
    console.log("\n📊 Seeding Summary:");
    console.log(
      `- Featured videos: ${videos.filter((v) => v.featured).length}`
    );
    console.log(
      `- Trending videos: ${videos.filter((v) => v.trending).length}`
    );
    console.log("\nGenres:");
    const genres = {};
    videos.forEach((v) => {
      genres[v.genre] = (genres[v.genre] || 0) + 1;
    });
    Object.entries(genres).forEach(([genre, count]) => {
      console.log(`  - ${genre}: ${count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
