import { useState, useRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, onProgress, onEnded }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [subtitle, setSubtitle] = useState(null);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const controlsTimeout = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      if (onProgress) {
        onProgress(progress);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setPlaying(false);
      if (onEnded) {
        onEnded();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onEnded]);

  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (muted) {
      videoRef.current.volume = volume;
      setMuted(false);
    } else {
      videoRef.current.volume = 0;
      setMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      videoRef.current.parentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 3000);
  };

  const changeQuality = (newQuality) => {
    const qualityVideo = video.quality?.find(q => q.resolution === newQuality);
    if (qualityVideo) {
      const currentTime = videoRef.current.currentTime;
      setQuality(newQuality);
      // In real implementation, change video source here
      videoRef.current.currentTime = currentTime;
    }
    setShowQualityMenu(false);
  };

  const changeSubtitle = (lang) => {
    setSubtitle(lang);
    setShowSubtitleMenu(false);
    // In real implementation, load subtitle track here
  };

  return (
    <div className="video-player" onMouseMove={handleMouseMove}>
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="video-element"
        onClick={togglePlay}
      >
        {video.subtitles?.map((sub) => (
          <track
            key={sub.language}
            kind="subtitles"
            src={sub.url}
            srcLang={sub.language}
            label={sub.language.toUpperCase()}
            default={subtitle === sub.language}
          />
        ))}
      </video>

      <div className={`video-controls ${showControls ? 'show' : ''}`}>
        <div className="progress-bar" onClick={handleSeek}>
          <div className="progress-filled" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
        </div>

        <div className="controls-row">
          <div className="controls-left">
            <button className="control-btn" onClick={togglePlay}>
              {playing ? '⏸' : '▶'}
            </button>
            <button className="control-btn" onClick={() => skipTime(-10)}>
              ⏪ 10s
            </button>
            <button className="control-btn" onClick={() => skipTime(10)}>
              10s ⏩
            </button>
            <button className="control-btn" onClick={toggleMute}>
              {muted ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="controls-right">
            <div className="menu-container">
              <button className="control-btn" onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}>
                CC
              </button>
              {showSubtitleMenu && (
                <div className="quality-menu">
                  <div onClick={() => changeSubtitle(null)}>Off</div>
                  {video.subtitles?.map((sub) => (
                    <div key={sub.language} onClick={() => changeSubtitle(sub.language)}>
                      {sub.language.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="menu-container">
              <button className="control-btn" onClick={() => setShowQualityMenu(!showQualityMenu)}>
                {quality}
              </button>
              {showQualityMenu && (
                <div className="quality-menu">
                  {video.quality?.map((q) => (
                    <div key={q.resolution} onClick={() => changeQuality(q.resolution)}>
                      {q.resolution}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="control-btn" onClick={toggleFullscreen}>
              {fullscreen ? '⛶' : '⛶'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
