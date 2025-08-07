import React from 'react'

const Pricing = ({ isVisible }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Up to 5 projects',
        'Basic task management',
        'Mobile app access',
        'Email support'
      ],
      popular: false,
      buttonText: 'Get Started'
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/month',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Team collaboration',
        'Priority support',
        'Custom integrations'
      ],
      popular: true,
      buttonText: 'Start Free Trial'
    },
    {
      name: 'Team',
      price: '$25',
      period: '/month',
      features: [
        'Everything in Pro',
        'Advanced team features',
        'Admin dashboard',
        'SSO integration',
        '24/7 phone support'
      ],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ]

  return (
    <section id="pricing" className={`pricing animate-section ${isVisible ? 'fade-in-up' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-description">
            Choose the plan that's right for you. No hidden fees, cancel anytime.
          </p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <span className="checkmark">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-full`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
