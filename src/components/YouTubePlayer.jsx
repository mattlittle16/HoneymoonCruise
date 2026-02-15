import './YouTubePlayer.css';

const YouTubePlayer = () => {
  // Extract video ID from URL: https://www.youtube.com/watch?v=Tff28sDGU_c
  const videoId = 'Tff28sDGU_c';

  return (
    <div className="youtube-container">
      <div className="youtube-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Mediterranean Cruise Memory"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubePlayer;
