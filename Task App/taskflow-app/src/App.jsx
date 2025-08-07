import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Reviews from './components/Reviews'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('.animate-section')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <Header />
      <main>
        <Hero isVisible={isVisible.hero} />
        <Features isVisible={isVisible.features} />
        <Reviews isVisible={isVisible.reviews} />
        <Pricing isVisible={isVisible.pricing} />
      </main>
      <Footer />
    </div>
  )
}

export default App
