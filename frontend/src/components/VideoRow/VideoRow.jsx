import { useRef } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import './VideoRow.css';

const VideoRow = ({ title, videos, onAddToList }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="video-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          ‹
        </button>
        <div className="videos" ref={rowRef}>
          {videos?.map((video) => (
            <VideoCard key={video._id} video={video} onAddToList={onAddToList} />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
};

export default VideoRow;
