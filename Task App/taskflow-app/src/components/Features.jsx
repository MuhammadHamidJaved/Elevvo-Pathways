import React from 'react'

const Features = ({ isVisible }) => {
  const features = [
    {
      icon: '🎯',
      title: 'Smart Organization',
      description: 'Automatically categorize and prioritize your tasks with our intelligent algorithm for maximum efficiency.'
    },
    {
      icon: '🔄',
      title: 'Real-time Sync',
      description: 'Access your tasks from anywhere, anytime. Changes sync instantly across all your devices.'
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description: 'Track your productivity with detailed analytics and insights to help you improve your workflow.'
    }
  ]

  return (
    <section id="features" className={`features animate-section ${isVisible ? 'fade-in-up' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-description">
            Everything you need to manage your tasks efficiently and boost your productivity
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
