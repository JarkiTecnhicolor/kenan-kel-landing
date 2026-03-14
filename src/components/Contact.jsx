import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import WaveBackground from './backgrounds/WaveBackground';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setFormData({ name: '', email: '', project: '', message: '' });
  };

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <WaveBackground />
      <div className={styles.bgGlow} />
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.label}>Get in Touch</span>
            <h2 className="section-title">Let's Build Something Amazing</h2>
            <p className="section-subtitle">
              Have a project in mind? We'd love to hear about it. Drop us a message
              and we'll get back to you within 24 hours.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>hello@kenankel.dev</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoValue}>Worldwide, Remote-first</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Project Type</label>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="">Select a service</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="design">UI/UX Design</option>
                <option value="cloud">Cloud & DevOps</option>
                <option value="ai">AI Integration</option>
                <option value="consulting">Consulting</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Tell us about your project..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
