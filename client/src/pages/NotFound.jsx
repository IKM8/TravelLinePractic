import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <div className="tl-notfound">
      <Header />
      <main>
        <h1 className="tl-visually-hidden">TL:TECH</h1>
        <section className="tl-notfound__section">
          <video
            className="tl-notfound__video"
            autoPlay loop muted playsInline
            width="1920" height="1080"
          >
            <source src="/upload/hero.mp4" type="video/mp4" />
          </video>

          <div className="tl-notfound__title">
              <span className="tl-notfound__badge">Ошибка 404</span>
            <h2>
              Такая страница не найдена<br />
              Лучше вернитесь на <a href="/">главную</a>, вдруг мы предназначены друг для друга
            </h2>
          </div>

          <div className="tl-notfound__images">
            <img className="tl-notfound__img-404" src="/images/404.svg" alt="404" />
            <img className="tl-notfound__img-panda" src="/images/panda.svg" alt="Panda" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
