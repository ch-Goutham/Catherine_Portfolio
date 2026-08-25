import React, { useState, useEffect } from 'react';
import './index.css';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        } else {
          setHasStarted(false);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    let animationFrame;


    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuad = (t) => t * (2 - t);

      setCount(Math.floor(easeOutQuad(percentage) * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const PremiumText = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.2em' }}>
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} style={{ display: 'inline-block', verticalAlign: 'bottom', paddingBottom: '2px' }}>
              <motion.span
                initial={{
                  y: "100%",
                  opacity: 0,
                  filter: "blur(15px)",
                  rotateX: 90,
                  scale: 0.4
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  rotateX: 0,
                  scale: 1
                }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{
                  duration: 1.6,
                  delay: delay + (wordIndex * 0.08) + (charIndex * 0.04),
                  ease: [0.19, 1, 0.22, 1]
                }}
                style={{
                  display: 'inline-block',
                  transformOrigin: "bottom center",
                  cursor: "default",
                  zIndex: 2,
                  position: 'relative'
                }}
              >
                {char === 'i' ? (
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    {/* Stem part (bottom 70%) */}
                    <span style={{
                      display: 'inline-block',
                      clipPath: 'inset(28% 0 0 0)',
                      opacity: 1
                    }}>
                      {char}
                    </span>
                    {/* Dot part (top 30%) */}
                    <motion.span
                      initial={{ x: -150, y: 0, rotate: -720, opacity: 0 }}
                      whileInView={{
                        x: 0,
                        rotate: 0,
                        y: [0, -30, 0, -15, 0],
                        opacity: 1
                      }}
                      viewport={{ once: false }}
                      transition={{
                        x: {
                          duration: 0.8,
                          ease: "easeOut",
                          delay: delay + (wordIndex * 0.08) + (charIndex * 0.04) + 0.8
                        },
                        rotate: {
                          duration: 0.8,
                          ease: "easeOut",
                          delay: delay + (wordIndex * 0.08) + (charIndex * 0.04) + 0.8
                        },
                        y: {
                          duration: 1.2,
                          times: [0, 0.4, 0.6, 0.8, 1],
                          ease: "easeOut",
                          delay: delay + (wordIndex * 0.08) + (charIndex * 0.04) + 1.6 // Start after rolling sequence
                        },
                        opacity: {
                          duration: 0.3,
                          delay: delay + (wordIndex * 0.08) + (charIndex * 0.04) + 0.8
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        clipPath: 'inset(0 0 72% 0)',
                        display: 'inline-block',
                        transformOrigin: 'center 15%' // Rotate around the dot area
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ) : char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}

      {/* Decorative Shimmer Overlay */}
      <motion.div
        initial={{ left: '-100%' }}
        animate={{ left: '100%' }}
        transition={{
          duration: 2.5,
          delay: delay + 2,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0,
          width: '40%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(120, 175, 253, 0.15), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
          transform: 'skewX(-20deg)'
        }}
      />
    </span>
  );
};




const PremiumQuote = ({ text, delay = 0 }) => {
  const words = text.split(" ");

  return (
    <p className="hero-quote" style={{ display: 'flex', flexWrap: 'wrap', fontStyle: 'italic' }}>
      {words.map((word, i) => {
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: "blur(10px)", x: -10, letterSpacing: "5px" }}
            whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, letterSpacing: "0px" }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
              duration: 1.2,
              delay: delay + (i * 0.1),
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
            style={{
              display: 'inline-block',
              marginRight: '0.3em'
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

const PremiumIntro = ({ name, delay = 0 }) => {
  const introText = "Hello! I'm ";

  return (
    <div className="hero-hello" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <motion.div style={{ display: 'flex' }}>
        {introText.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{
              duration: 0.4,
              delay: delay + (i * 0.03),
              ease: "easeOut"
            }}
            style={{ display: 'inline-block' }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      <span
        className="name"
        style={{
          display: 'inline-flex',
          position: 'relative',
          fontWeight: '700'
        }}
      >
        {name.split("").map((char, j) => (
          <span
            key={j}
            style={{ display: 'inline-block' }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
};

const BounceText = ({ text, delay = 0 }) => {
  return (
    <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 0 }}
          whileInView={{
            y: [0, -15, 0],
          }}
          viewport={{ once: false }}
          transition={{
            duration: 0.5,
            delay: delay + (i * 0.04),
            ease: "circOut",
            times: [0, 0.4, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const SplitSlideText = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  const mid = Math.ceil(words.length / 2);
  const leftPart = words.slice(0, mid).join(" ");
  const rightPart = words.slice(mid).join(" ");

  return (
    <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', width: 'fit-content', color: '#0D3F80' }}>
      <motion.span
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
          delay: delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ display: 'inline-block', marginRight: '0.3em' }}
      >
        {leftPart}
      </motion.span>
      <motion.span
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
          delay: delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ display: 'inline-block' }}
      >
        {rightPart}
      </motion.span>
    </div>
  );
};

const PremiumPortrait = ({ src }) => {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      style={{ position: 'relative', width: 'var(--hero-portrait-width)', height: 'var(--hero-portrait-height)' }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <img
          src={src}
          alt="Portrait"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=776';
          }}
        />
      </div>
    </motion.div>
  );
};



function App() {
  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      quote: "Working with this team has been a game-changer for our business. Their attention to detail and commitment to delivering quality exceeded our expectations. They truly understand what it takes to succeed.",
      name: "Richard Mathews",
      role: "Syntrix",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      quote: "The strategic insights provided by Hepsibah and her team were instrumental in our growth phase. Innovative, reliable, and highly professional at every step of the journey.",
      name: "Sarah Jenkins",
      role: "Optiverse",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      quote: "Manvian has been our primary partner for technology solutions for over 3 years. Their ability to turn ideas into reality is what sets them apart in this industry.",
      name: "David Chen",
      role: "TecHub",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 4,
      quote: "Exceptional service and outstanding results. The final product exceeded all our KPIs. This is the partner you want if you are looking for excellence.",
      name: "Elena Rossi",
      role: "ArtMount",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const [quoteIndex, setQuoteIndex] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    purpose: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone to allow only digits and leading +
    if (name === 'phone') {
      const cleaned = value.replace(/(?!^\+)[^\d]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone Validation logic
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const digitsOnly = formData.phone.replace(/\+/g, '');
      if (formData.phone.startsWith('+91')) {
        const numberPart = formData.phone.substring(3);
        if (numberPart.length !== 10) {
          newErrors.phone = 'India number must be 10 digits';
        }
      } else if (digitsOnly.length < 10) {
        newErrors.phone = 'Minimum 10 digits required';
      }
    }

    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:5000/api/contact'
          : 'https://portfolio-hepsi-mam-backend.onrender.com/api/contact';

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
          setSubmitStatus('success');
          // Clear form after success
          setFormData({ name: '', email: '', phone: '', location: '', company: '', purpose: '' });
          // Reset success message after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        } else {
          // If server returns error, we can handle it via a new state or just alert
          alert(`Submission failed: ${result.message}`);
          setSubmitStatus('error');
        }
      } catch (err) {
        console.error("Networking Error:", err);
        alert("Server is not responding. Ensure the Python backend is running.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Quotes Data for the CTA section (4 items to match dots)
  const quotes = [
    {
      id: 1,
      text: "Great companies are not built by <strong>ideas</strong> alone, but by people who believe in turning those ideas into <strong>reality</strong>.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/mam.png",
      layoutType: "photo-left"
    },
    {
      id: 2,
      text: "People think confidence comes from success. But honestly It's the other way around. Success comes from daring to be <strong>confident</strong> first.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/quote 1.png",
      layoutType: "photo-right"
    },
    {
      id: 3,
      text: "Innovation is the difference between a leader and a follower. We lead with <strong>purpose</strong>.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/quote 2.png",
      layoutType: "photo-left"
    },
    {
      id: 4,
      text: "Our mission is to create <strong>opportunities</strong> that empower communities and sustain the planet.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/quote 3.png",
      layoutType: "photo-right"
    }
  ];

  // Auto-play for quotes
  React.useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const footerRef = React.useRef(null);
  const [footerMessage, setFooterMessage] = React.useState("");

  return (
    <div className="app-container">
      {/* Premium Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX }}
        />
      </div>

      {/* Background patterns for Hero section */}
      <div className="bg-pattern" />



      {/* Header */}
      <header className={scrolled ? 'sticky-header' : ''}>
        <div className="header-container">
          <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            {['ABOUT', 'FIRMS', 'TESTIMONIALS', 'CONTACT'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="book-btn-mobile"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              BOOK APPOINTMENT
            </motion.a>
          </nav>
          <div className="book-btn-wrapper">
            <motion.a
              href="#contact"
              className="book-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              BOOK APPOINTMENT
            </motion.a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero">
        {/* Background abstract rings */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '600px', height: '600px', border: '1px solid #06254D', opacity: 0.2, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '10%', left: '-20%', width: '800px', height: '800px', border: '1px solid #06254D', opacity: 0.2, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', border: '1px solid #06254D', opacity: 0.2, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '10%', right: '-20%', width: '800px', height: '800px', border: '1px solid #06254D', opacity: 0.2, borderRadius: '50%' }} />
        </div>
        <div className="hero-container" style={{ perspective: '1000px' }}>
          <motion.div
            className="hero-left"
            initial="hidden"
            animate="visible"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <PremiumIntro name="Hepsibah Catherine" delay={0.2} />


            <h1 className="hero-title" style={{ display: 'flex', flexDirection: 'column' }}>
              <PremiumText text="Multipreneur" delay={0.4} />
              <PremiumText text="& Consultant" delay={0.6} />
            </h1>


            <PremiumQuote
              text="“Building for people and planet with purpose.”"
              delay={1.2}
            />

          </motion.div>

          <div className="hero-right">
            <motion.div
              className="hero-blue-arc"
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                transformOrigin: 'bottom',
                height: 'var(--hero-arc-height)',
                width: 'var(--hero-arc-width)',
                overflow: 'hidden',
                boxShadow: "0 0 20px rgba(13, 57, 138, 0.2)"
              }}
            >
            </motion.div>
            <div
              className="main-portrait"
            >
              <PremiumPortrait src="/logos/mam.png" />
            </div>
          </div>
        </div>
      </main>




      {/* Stats Bar */}
      <section className="stats-bar-navy">
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="sn-num">
            <CountUp end={500} suffix="+" />
          </span>
          <span className="sn-text">Successful Projects</span>
        </motion.div>
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="sn-num">
            <CountUp end={10} suffix="+" />
          </span>
          <span className="sn-text">Country Presence</span>
        </motion.div>
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="sn-num">
            <CountUp end={5} suffix="+" />
          </span>
          <span className="sn-text">Years of Experience</span>
        </motion.div>
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span className="sn-num">
            <CountUp end={100000} suffix="+" />
          </span>
          <span className="sn-text">People Empowered</span>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="about-section" id="about">
        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2>About Me</h2>
          <p>
            As a CEO, I believe leadership is about vision, innovation, and people. My journey has been driven by the passion to build meaningful solutions that create real impact. I focus on leading with clarity, empowering talented teams, and continuously exploring new opportunities for growth. Through strategic thinking and strong execution, I strive to guide my company toward excellence while creating lasting value for our clients and community.
          </p>

        </motion.div>
        <div className="cards-container">
          {/* Mission Card */}
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 100, rotateY: -15, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              transition: { duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
            }}
            animate={{
              y: [0, -12, 0],
              rotateY: [-1, 1, -1],
              rotateX: [1, -1, 1]
            }}
            transition={{
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              rotateY: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              rotateX: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, z: 50, transition: { duration: 0.3 } }}
          >
            <div className="card-icon-wrapper">
              <motion.img
                src="/icons/mission.png"
                alt="Mission"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="card-content">
              <h3>Mission</h3>
              <div className="card-separator"></div>
              <p>To drive innovation and deliver meaningful growth for customers and stakeholders. We focus on creating impactful solutions that add long-term value.</p>
            </div>
            <div className="card-decoration" />
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 100, rotateY: -15, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            animate={{
              y: [0, -12, 0],
              rotateY: [1, -1, 1],
              rotateX: [-1, 1, -1]
            }}
            transition={{
              y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
              rotateY: { repeat: Infinity, duration: 6.5, ease: "easeInOut" },
              rotateX: { repeat: Infinity, duration: 5.5, ease: "easeInOut" }
            }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, z: 50, transition: { duration: 0.3 } }}
          >
            <div className="card-icon-wrapper">
              <motion.img
                src="/icons/vision.png"
                alt="Vision"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="card-content">
              <h3>Vision</h3>
              <div className="card-separator"></div>
              <p>To build a future-ready organization that leads with purpose and inspires change. We aim to set new standards of excellence in everything we do.</p>
            </div>
            <div className="card-decoration" />
          </motion.div>

          {/* Values Card */}
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 100, rotateY: -15, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              transition: { duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
            animate={{
              y: [0, -12, 0],
              rotateY: [-1, 1, -1],
              rotateX: [1, -1, 1]
            }}
            transition={{
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              rotateY: { repeat: Infinity, duration: 7, ease: "easeInOut" },
              rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" }
            }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, z: 50, transition: { duration: 0.3 } }}
          >
            <div className="card-icon-wrapper">
              <motion.img
                src="/icons/values.png"
                alt="Values"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="card-content">
              <h3>Values</h3>
              <div className="card-separator"></div>
              <p>We believe in integrity, innovation, and excellence in every action. Collaboration and a customer-first approach guide our decisions.</p>
            </div>
            <div className="card-decoration" />
          </motion.div>

        </div>
      </section>

      {/* Prestigious Firms Section */}
      <section className="firms-section" id="firms">
        <div className="rings-container">
          {/* Orbital Rings */}
          <div className="orbit-ring ring-1" />
          <div className="orbit-ring ring-2" />
          <div className="orbit-ring ring-3" />
          <div className="orbit-ring ring-4" />

          {/* Background Stars */}
          <div className="star star-s1"></div>
          <div className="star star-s2"></div>
          <div className="star star-s3"></div>
          <div className="star star-s4"></div>
          <div className="star star-s5"></div>
          <div className="star star-s6"></div>
          <div className="star star-s7"></div>
          <div className="star star-s8"></div>
          <div className="star star-s9"></div>
          <div className="star star-s10"></div>
          <div className="star star-s11"></div>
          <div className="star star-s12"></div>
          <div className="star star-s13"></div>
          <div className="star star-s14"></div>
          <div className="star star-s15"></div>

          {/* Animated Dots */}
          <div className="orbital-dot dot-1"></div>
          <div className="orbital-dot dot-1-alt"></div>
          <div className="orbital-dot dot-2"></div>
          <div className="orbital-dot dot-2-alt"></div>
          <div className="orbital-dot dot-3"></div>
          <div className="orbital-dot dot-3-alt"></div>
          <div className="orbital-dot dot-4"></div>
          <div className="orbital-dot dot-4-alt"></div>

          {/* Glowing Center Logo (Main) */}
          <a
            href="https://manvian.com/"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-30"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/Manvian.png" alt="Manvian" /></div>
                <div className="pill-text">
                  <span>Manvian</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>

          {/* Partner Logos along orbits */}
          <a
            href="https://topackz.com/"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-31"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/Topackz.png" alt="Topackz" /></div>
                <div className="pill-text">
                  <span>Topackz</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://www.wraptron.com/"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-32"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/image 2.png" alt="Partner" /></div>
                <div className="pill-text">
                  <span>Wraptron</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://opptiverse.com/"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-29"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/optiverse.png" alt="Optiverse" /></div>
                <div className="pill-text">
                  <span>Optiverse</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="http://www.mspace.manvian.com/"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-33"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/MSpace.png" alt="M Space" /></div>
                <div className="pill-text">
                  <span>M Space</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://www.deepdarkcreations.com/"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-26"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/image 3.png" alt="Partner" /></div>
                <div className="pill-text">
                  <span>Deep Dark<br />Creations</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://www.artmountacademy.com/Home.html"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-27"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/Artmount.png" alt="Artmount" /></div>
                <div className="pill-text">
                  <span>Artmount</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://manvian.com/"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-34"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/Mabs.png" alt="Mabs" /></div>
                <div className="pill-text">
                  <span>MABS</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-35"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/manfa.png" alt="Manfa" /></div>
                <div className="pill-text">
                  <span>Manfa</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="partner-logo-pill logo-ellipse-36"
          >
            <div className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/storaa.png" alt="Storaa" /></div>
                <div className="pill-text">
                  <span>Storaa</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        <h2 className="section-title">
          <div style={{ display: 'inline-block' }}>
            {"Our Prestigious".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                style={{ display: 'inline-block' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <br />
          <div style={{ display: 'inline-block' }}>
            {"Firms".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (index + 15) * 0.04 }}
                style={{ display: 'inline-block' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </h2>
      </section>

      <section className="testimonials-section-v2" id="testimonials">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <h2 className="testimonials-title">
            <BounceText text="Hear From Our People" />
          </h2>
          <p className="testimonials-subtitle">Trusted by clients across industries Delivering results that truly matter</p>
        </motion.div>

        <motion.div
          className="testimonial-container-v2"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Navigation Arrows */}
          <button className="nav-btn prev" onClick={prevSlide} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="testimonial-stack">
            {/* Main Active Card */}
            <div
              className="testimonial-card-v2 active"
            >
              <div className="card-inner">
                <p className="quote-text">“{testimonials[activeIndex].quote}”</p>
                <div className="user-profile">
                  <div className="avatar">
                    <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} />
                  </div>
                  <div className="user-info">
                    <h4>{testimonials[activeIndex].name}</h4>
                    <p>{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="nav-btn next" onClick={nextSlide} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </motion.div>
      </section>

      {/* Quote/Vision Section - Sliding enabled */}
      <section className="quote-cta-section">
        <motion.div
          className="quote-bg-rings"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="quote-bg-ring q-ring-top-1"></div>
          <div className="quote-bg-ring q-ring-top-2"></div>
          <div className="quote-bg-ring q-ring-bottom-1"></div>
          <div className="quote-bg-ring q-ring-bottom-2"></div>
          <div className="quote-bg-ring q-ring-left-1"></div>
          <div className="quote-bg-ring q-ring-left-2"></div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className={`quote-slide-wrap active ${quotes[quoteIndex].layoutType}`}
          >
            <div className="quote-content-container">
              <motion.div
                className="quote-portrait"
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -60, opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={quotes[quoteIndex].image}
                  alt={quotes[quoteIndex].author}
                  onError={(e) => { e.target.src = '/logos/mam.png'; }}
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
                />
              </motion.div>
              <div className="quote-text-block">
                <motion.h2
                  className="main-quote"
                  dangerouslySetInnerHTML={{ __html: `“${quotes[quoteIndex].text}”` }}
                  initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.div
                  className="quote-author"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span className="quote-author-name">-{quotes[quoteIndex].author}</span>
                  <span className="quote-author-title">{quotes[quoteIndex].title}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots (Bottom Right) */}
        <div className="quote-pagination">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`pagination-dot ${index === quoteIndex ? 'active' : ''}`}
              onClick={() => setQuoteIndex(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2>
              <SplitSlideText text="Let’s Connect" />
            </motion.h2>
            <motion.p
              className="contact-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Interested in collaboration, partnerships, or business opportunities? Feel free to reach out and start the conversation.
            </motion.p>

            <motion.div
              className="contact-info-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                }
              }}
            >
              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=No.4,+1st+floor,+Alamathi+main+road,+New+vellanur,+Avadi,+chennai+-+600062"
                target="_blank"
                rel="noreferrer"
                className="contact-info-item contact-text-link"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="contact-text">
                  <h3>Location</h3>
                  <p>No.4, 1st floor, Alamathi main road,<br />New vellanur, Avadi ,chennai - 600062.</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:connect@manvian.com"
                className="contact-info-item contact-text-link"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline><circle cx="18" cy="18" r="4" fill="white" stroke="#0D3F80"></circle><path d="M18 16v2.5l2 1" stroke="#0D3F80"></path></svg>
                </div>
                <div className="contact-text">
                  <h3>Email Address</h3>
                  <p>connect@manvian.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+918778359643"
                className="contact-info-item contact-text-link"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <p>+91 8778359643</p>
                  <p>+91 75982 96248</p>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-right"
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1000px' }}
          >
            <div className="form-box-container" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0] // Gentle ambient float
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 },
                      y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                  >
                    {/* Decorative Confetti Pieces */}
                    {[...Array(25)].map((_, i) => {
                      const randomX = Math.random() * 800 - 400;
                      const randomY = Math.random() * 600 - 300;
                      const randomColor = ['#0D3F80', '#A0522D', '#78AFFD', '#FFD700', '#FFFFFF'][Math.floor(Math.random() * 5)];

                      return (
                        <motion.div
                          key={i}
                          className="confetti-piece"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                          animate={{
                            x: randomX,
                            y: randomY,
                            opacity: 0,
                            scale: 0.5,
                            rotate: Math.random() * 1080
                          }}
                          transition={{
                            duration: 1.8 + Math.random(),
                            delay: 0.2,
                            ease: "easeOut"
                          }}
                          style={{ backgroundColor: randomColor }}
                        />
                      );
                    })}

                    <motion.div
                      className="success-icon"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', damping: 12, stiffness: 200 }}
                    >
                      <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline className="checkmark-path" points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.div>
                    <motion.h3
                      className="shimmer-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Thank You!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Your message has been sent successfully. I'll get back to you soon.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={() => setSubmitStatus(null)}
                      className="submit-btn pill-btn"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="form-row">
                      <div className="form-group half">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name*"
                          className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>
                      <div className="form-group half">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email*"
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half">
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your Phone*"
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                      <div className="form-group half">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Location*"
                          className={errors.location ? 'error' : ''}
                        />
                        {errors.location && <span className="error-text">{errors.location}</span>}
                      </div>
                    </div>
                    <div className="form-group full">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company/Organization*"
                        className={errors.company ? 'error' : ''}
                      />
                      {errors.company && <span className="error-text">{errors.company}</span>}
                    </div>
                    <div className="form-group full">
                      <textarea
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        placeholder="Purpose for connecting*"
                        rows="4"
                        className={errors.purpose ? 'error' : ''}
                      ></textarea>
                      {errors.purpose && <span className="error-text">{errors.purpose}</span>}
                    </div>
                    <button type="submit" className="submit-btn pill-btn" disabled={isSubmitting} style={{ cursor: isSubmitting ? 'url(data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewport=%220 0 16 16%22><text x=%220%22 y=%2214%22>🚀</text></svg>) 16 16, auto' : 'pointer' }}>
                      {isSubmitting ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            style={{ display: 'inline-block' }}
                          >
                            ⏳
                          </motion.span>
                          Sending...
                        </span>
                      ) : 'Get In Touch'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact Hybrid Section */}
      <section className="footer-section" id="footer" ref={footerRef}>
        <div className="footer-globe-bg">
          <motion.video
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5 }}
            src="/logos/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          />
        </div>
        <div className="footer-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Let’s Make Something <br />Amazing Together.
          </motion.h1>
          <motion.div
            className="footer-input-bar"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Type Your Message Here.."
              value={footerMessage}
              onChange={(e) => setFooterMessage(e.target.value)}
            />
            <motion.button
              className="contact-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                const text = footerMessage.trim();
                const url = text
                  ? `https://wa.me/918778359643?text=${encodeURIComponent(text)}`
                  : "https://wa.me/918778359643";
                window.open(url, "_blank");
              }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
        <div className="footer-bottom-bar">
          <motion.p
            className="footer-copyright"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            © 2026 All rights reserved. | Designed & Developed By Manvian
          </motion.p>
          <motion.div
            className="footer-socials"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.8 }
              }
            }}
          >
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="https://www.instagram.com/hepsibah_catherine?igsh=Y2R3YXF3bTh3MXJ2" target="_blank" rel="noreferrer" className="footer-social-circle"
            >
              <img src="/icons/instagram.png" alt="Instagram" />
            </motion.a>
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="mailto:connect@manvian.com" className="footer-social-circle"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </motion.a>
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="https://wa.me/918778359643" target="_blank" rel="noreferrer" className="footer-social-circle"
            >
              <img src="/icons/whatsapp.png" alt="WhatsApp" />
            </motion.a>
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="https://www.linkedin.com/in/hepsibah-catherine/" target="_blank" rel="noreferrer" className="footer-social-circle"
            >
              <span className="linkedin-in" style={{ fontSize: '24px' }}>in</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default App;
