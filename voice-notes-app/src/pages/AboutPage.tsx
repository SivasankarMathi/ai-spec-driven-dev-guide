import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <nav className="about-nav">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </nav>

      <div className="about-container">
        <section className="about-hero">
          <span className="about-badge">About</span>
          <h1 className="about-title">Voice Notes</h1>
          <p className="about-subtitle">
            Capture your thoughts instantly with voice or text
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-heading">Our Mission</h2>
          <p className="section-text">
            We believe your best ideas shouldn't be lost. Voice Notes makes it effortless 
            to capture thoughts the moment they strike, whether you're typing or speaking.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-heading">What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎙️</div>
              <h3 className="feature-title">Voice Recording</h3>
              <p className="feature-description">
                Record your thoughts naturally with high-quality audio capture
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✍️</div>
              <h3 className="feature-title">Rich Text Editor</h3>
              <p className="feature-description">
                Format your notes beautifully with our intuitive editor
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Smart Search</h3>
              <p className="feature-description">
                Find any note instantly with powerful search capabilities
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Responsive Design</h3>
              <p className="feature-description">
                Access your notes seamlessly across all your devices
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-heading">Privacy First</h2>
          <p className="section-text">
            Your notes are stored locally on your device. We respect your privacy 
            and never access or share your personal data.
          </p>
        </section>

        <footer className="about-footer">
          <p className="footer-text">
            Built with care for people who value their ideas
          </p>
          <p className="footer-version">Version 1.0.0</p>
        </footer>
      </div>
    </div>
  );
}

export default AboutPage;
