# 🎥 How to Add Your Dog Videos

## Option 1: Cloudinary (Recommended) - FREE

### Step 1: Sign Up
1. Go to https://cloudinary.com
2. Create a free account
3. You get 25GB storage and 25GB bandwidth/month FREE

### Step 2: Upload Videos
1. Log into your Cloudinary dashboard
2. Click "Media Library"
3. Click "Upload" button
4. Select your dog videos
5. Wait for upload to complete

### Step 3: Get Video URLs
1. Click on the uploaded video
2. Copy the video URL (looks like: `https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/video-name.mp4`)
3. For thumbnail: Click "Generate Image" or upload a thumbnail separately

### Step 4: Update seed.js
Replace these in `/backend/seed.js`:
- `YOUR_CLOUDINARY_VIDEO_URL_1` → Your actual video URL
- `YOUR_CLOUDINARY_THUMBNAIL_URL_1` → Your actual thumbnail URL
- Update `duration` (in seconds)
- Update `title`, `description`, `cast` with your dog names

### Step 5: Re-seed the Database
```bash
cd backend
node seed.js
```

---

## Option 2: Quick Test with Public Videos

If you want to test first, use these FREE sample videos:

```javascript
{
  title: 'My Dog at the Beach',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
  duration: 596,
  genre: 'Pets',
  // ... rest of the fields
}
```

---

## Example Complete Video Entry

```javascript
{
  title: 'Bruno Playing Fetch',
  description: 'Bruno the Golden Retriever loves playing fetch at the park!',
  videoUrl: 'https://res.cloudinary.com/demo/video/upload/dog_hike.mp4',
  thumbnail: 'https://res.cloudinary.com/demo/image/upload/dog_hike_thumb.jpg',
  duration: 240, // 4 minutes
  genre: 'Pets',
  releaseYear: 2026,
  rating: 'G',
  cast: ['Bruno', 'Max', 'Charlie'],
  director: 'Leo Oladimu',
  quality: [
    { resolution: '720p', url: 'https://res.cloudinary.com/demo/video/upload/q_auto/dog_hike.mp4' },
    { resolution: '1080p', url: 'https://res.cloudinary.com/demo/video/upload/q_auto:high/dog_hike.mp4' }
  ],
  featured: true,
  trending: true
}
```

---

## Tips for Best Results

### Video Format
- **Format**: MP4 (H.264 codec)
- **Resolution**: 720p or 1080p
- **File Size**: Under 100MB for faster loading

### Thumbnail
- **Format**: JPG or PNG
- **Size**: 1920x1080 or 1280x720
- **Tip**: Take a screenshot from an exciting moment in the video!

### Duration
- Calculate in seconds: 
  - 1 minute = 60 seconds
  - 5 minutes = 300 seconds
  - 10 minutes = 600 seconds

---

## Need Help?

**Cloudinary Video URL Format:**
```
https://res.cloudinary.com/[your-cloud-name]/video/upload/[video-id].mp4
```

**If video doesn't play:**
1. Check if URL is accessible in browser
2. Make sure video is public (not private)
3. Ensure CORS is enabled on your hosting
4. Try a different video format (MP4 is best)

**Free Video Hosting Alternatives:**
- Google Drive (set to public, get direct link)
- Vimeo (embed link)
- Bunny CDN (has free tier)
