import React from 'react'

const Hero = ({ isVisible }) => {
  return (
    <section id="hero" className={`hero animate-section ${isVisible ? 'fade-in-up' : ''}`}>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Organize Your Tasks with <span className="gradient-text">TaskFlow</span>
          </h1>
          <p className="hero-description">
            The ultimate task management tool that helps you stay organized, 
            boost productivity, and achieve your goals faster than ever before.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started Free</button>
            <button className="btn btn-secondary">Watch Demo</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="mockup-container">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="task-item">✓ Design new homepage</div>
                <div className="task-item">⏳ Review user feedback</div>
                <div className="task-item">📝 Plan next sprint</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
