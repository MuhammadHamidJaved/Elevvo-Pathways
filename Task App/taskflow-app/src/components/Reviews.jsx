import React from 'react'

const Reviews = ({ isVisible }) => {
  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      avatar: '👩‍💼',
      rating: 5,
      text: 'TaskFlow transformed how our team manages projects. The intuitive interface and smart features make task organization effortless!'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Freelance Designer',
      avatar: '👨‍🎨',
      rating: 5,
      text: 'As a freelancer juggling multiple clients, TaskFlow keeps me organized and on track. The analytics feature helps me optimize my workflow.'
    },
    {
      name: 'Emily Johnson',
      role: 'Startup Founder',
      avatar: '👩‍💻',
      rating: 5,
      text: 'The real-time sync feature is a game-changer. I can manage tasks on my phone during commutes and pick up where I left off on my laptop.'
    }
  ]

  return (
    <section id="reviews" className={`reviews animate-section ${isVisible ? 'fade-in-up' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-description">
            Join thousands of satisfied users who have transformed their productivity
          </p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{review.avatar}</div>
                  <div>
                    <h4 className="reviewer-name">{review.name}</h4>
                    <p className="reviewer-role">{review.role}</p>
                  </div>
                </div>
                <div className="rating">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
