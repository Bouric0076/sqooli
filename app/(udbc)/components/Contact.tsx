import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <h3>Contact Info</h3>
          <p className="contact__lead">
            Reach us through the contacts listed below or send us a message
          </p>
          <ul className="contact__list">
            <li><span>🌐</span> Website <a href="https://udbc.sqooli.africa">udbc.sqooli.africa</a></li>
            <li><span>🌐</span> Enrolment Portal <a href="https://udbc.sqooli.africa/intake-landing">udbc.sqooli.africa/intake-landing</a></li>
            <li><span>✉️</span> Email Address admin@udbc.sqooli.africa</li>
            <li><span>💬</span> WhatsApp Portal +255 XXX XXX XXX</li>
            <li><span>▶️</span> Youtube <a href="#">UFUFUONAUZIMA (RudishaTv)</a></li>
            <li><span>📷</span> @bishopgwajima · @udbc_sqooli</li>
          </ul>
          <div className="contact__divider" />
          <p className="contact__small"><strong>Blog / Devotionals</strong><br /><a href="#">udbc.sqooli.blog</a> — Short Fupi content hub</p>
          <p className="contact__small"><strong>Church Partner Portal</strong><br /><a href="#">udbc.sqooli.co</a> — partner church registration</p>
          <p className="contact__small"><strong>Physical Address</strong><br />c/o Ufufuo na Uzima Ministries, Nyumba ya Ufufuo na Uzima, Dar es Salaam, Tanzania</p>
          <p className="contact__small"><strong>Office Hours</strong><br />Monday–Friday, 08:00–17:00 EAT · WhatsApp bot: 24/7</p>
        </div>

        <div className="contact__form">
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <label>Your Name</label>
            <input name="name" value={form.name} onChange={handleChange} type="text" required />

            <label>Your Email Address</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" required />

            <label>Your Phone Number (Optional)</label>
            <div className="contact__phone">
              <span className="contact__flag">🇹🇿 ▾</span>
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="701234567" />
            </div>

            <label>Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={5} required />

            <button type="submit" className="btn btn-yellow">
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <p className="contact__verse">
        John 21:17 — He said to him the third time, Simon, son of John, do you love me? … He said
        to him, Feed my sheep.
      </p>
    </section>
  );
}
