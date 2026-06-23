import { useEffect, useRef } from 'react';

function Hero({ data }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section className="section hero" id="hero">
      <video
        ref={videoRef}
        className="hero__video video-src"
        autoPlay
        loop
        muted
        width="1920"
        height="1080"
        preload="auto"
        src={data.video_url}
      />
      
      <h2 className="hero__title heading heading--type-h1">
        {data.title[0]}<br />
        {data.title[1]}<br />
        {data.title[2]}
      </h2>
    </section>
  );
}

export default Hero;