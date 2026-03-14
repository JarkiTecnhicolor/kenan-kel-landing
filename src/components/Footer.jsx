import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.logoK}>Kenan</span>
              <span className={styles.logoAmp}>&</span>
              <span className={styles.logoK}>Kel</span>
            </span>
            <p className={styles.brandDesc}>
              Building the future of digital products, one pixel at a time.
            </p>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Company</h4>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#team">Team</a>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Services</h4>
            <a href="#services">Web Development</a>
            <a href="#services">Mobile Apps</a>
            <a href="#services">UI/UX Design</a>
            <a href="#services">Consulting</a>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Connect</h4>
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} Kenan & Kel. All rights reserved.</span>
          <span className={styles.madeWith}>
            Crafted with precision & passion
          </span>
        </div>
      </div>
    </footer>
  );
}
