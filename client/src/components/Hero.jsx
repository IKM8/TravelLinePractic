import { useEffect, useRef } from 'react';

function Hero({ data }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section className="tl-hero" id="hero">
      <video
        ref={videoRef}
        className="tl-hero__video"
        autoPlay
        loop
        muted
        width="1920"
        height="1080"
        preload="auto"
        src={data.video_url}
      />
      
      <h2 className="tl-hero__title">
        {data.title[0]}<br />
        {data.title[1]}<br />
        {data.title[2]}
      </h2>
    </section>
  );
}

export default Hero;