function Gallery({ data }) {
  const isVideo = (src) => src && src.endsWith('.mp4');

  return (
    <section className="tl-gallery" id="gallery">
      <div className="tl-gallery__container">
        {data.items.map((item, i) => (
          <div key={i} className="tl-gallery__item">
            {isVideo(item.src) ? (
              <video className="tl-gallery__img" autoPlay loop muted playsInline
                src={`/images/gallery/${item.src}`} />
            ) : (
              <img className="tl-gallery__img" src={`/images/gallery/${item.src}`} alt="" />
            )}
            <p className="tl-gallery__text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
