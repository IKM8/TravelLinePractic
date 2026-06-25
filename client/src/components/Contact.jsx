import { useState } from 'react';

const DIRECTIONS = ['Backend', 'Frontend', 'Тестирование', 'Проектирование и дизайн', 'Аналитика', 'Безопасность', 'Другое'];

function Contact({ data }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', link: '', direction: '', agreement: false });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <section className="tl-contact" id="contact-form">
      <div className="tl-contact__inner">
        <div className="tl-contact__left">
          <h2 className="tl-contact__title">{data.title}</h2>
          <p className="tl-contact__desc">{data.description}</p>
          <div className="tl-contact__video">
            <video autoPlay loop muted playsInline width="595" height="355" preload="auto" src={data.video_url}>
            </video>
          </div>
        </div>

        <form className="tl-contact__form" onSubmit={e => e.preventDefault()}>
          <div className="tl-contact__fields">
            <label className="tl-contact__label">
              <input type="text" value={form.name} placeholder="Имя*" required
                onChange={e => update('name', e.target.value)} className="tl-contact__input" />
            </label>
            <label className="tl-contact__label">
              <input type="tel" value={form.phone} placeholder="Телефон*" required
                onChange={e => update('phone', e.target.value)} className="tl-contact__input" />
            </label>
            <label className="tl-contact__label">
              <input type="email" value={form.email} placeholder="Эл. почта*" required
                onChange={e => update('email', e.target.value)} className="tl-contact__input" />
            </label>
            <label className="tl-contact__label">
              <input type="text" value={form.link} placeholder="Ссылка на резюме*" required
                onChange={e => update('link', e.target.value)} className="tl-contact__input" />
            </label>
            <label className="tl-contact__label tl-contact__label--select">
              <select value={form.direction}
                onChange={e => update('direction', e.target.value)}
                className="tl-contact__input tl-contact__input--select">
                <option value="">Какое направление тебе интересно</option>
                {DIRECTIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <span className="tl-contact__select-decor">
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                  <g opacity="0.4">
                    <circle cx="1.30435" cy="1.30435" r="1.30435" fill="white"/>
                    <circle cx="5.652" cy="5.652" r="1.30435" fill="white"/>
                    <circle cx="9.99966" cy="9.99966" r="1.30435" fill="white"/>
                    <circle cx="14.3473" cy="5.652" r="1.30435" fill="white"/>
                    <circle cx="18.695" cy="1.30435" r="1.30435" fill="white"/>
                  </g>
                </svg>
              </span>
            </label>
          </div>
          <p className="tl-contact__notice">* обязательные поля</p>
          <label className="tl-contact__label tl-contact__label--agreement">
            <input type="checkbox" checked={form.agreement}
              onChange={e => update('agreement', e.target.checked)}
              className="tl-contact__checkbox" />
            <span className="tl-contact__checkbox-square"></span>
            <span><a href="#" className="tl-contact__agreement-link">Я согласен</a> на <a href="#" className="tl-contact__agreement-link">обработку персональных данных</a></span>
          </label>
          <button type="submit" className="tl-contact__submit">{data.button_text || 'Отправить'}</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
