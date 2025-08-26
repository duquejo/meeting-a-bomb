import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, RotateCcw, Play } from 'lucide-react';
import { Button } from './components/button';

const App = () => {
  const [currentState, setCurrentState] = useState('welcome');
  const [countdownValue, setCountdownValue] = useState(10);
  const [particles, setParticles] = useState([]);
  const countdownInterval = useRef(null);

  const startCountdown = () => {
    setCurrentState('countdown');
    setCountdownValue(10);

    countdownInterval.current = setInterval(() => {
      setCountdownValue((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval.current);
          triggerExplosion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerExplosion = () => {
    setCurrentState('explosion');
    createParticleExplosion();
  };

  const createParticleExplosion = () => {
    const colors = ['#FF6B35', '#FFD23F', '#FF006E', '#8B5CF6', '#00D4FF', '#10B981'];
    const emojis = ['💥', '⭐', '✨', '🎆', '🎊', '💫', '🌟'];
    const newParticles = [];

    // Create 30 particles for spectacular explosion
    for (let i = 0; i < 30; i++) {
      const isEmoji = Math.random() > 0.6;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      newParticles.push({
        id: i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 2
      });
    }

    setParticles(newParticles);

    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 3000);
  };

  const resetFlow = () => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
    }
    setCurrentState('welcome');
    setCountdownValue(10);
    setParticles([]);
  };

  useEffect(() => {
    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, []);

  const StarField = () => (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-white rounded-full ${i % 3 === 0 ? 'bg-[var(--cosmic-blue)]' :
            i % 3 === 1 ? 'bg-[var(--electric-purple)]' : 'bg-white'
            }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: i % 2 === 0 ? '3px' : '2px',
            height: i % 2 === 0 ? '3px' : '2px'
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );

  const WelcomeState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="text-center"
      data-testid="welcome-state"
    >
      <div className="mb-12">
        <motion.div
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[var(--cosmic-blue)] to-[var(--electric-purple)] rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 20px var(--cosmic-blue)',
              '0 0 40px var(--cosmic-blue)',
              '0 0 20px var(--cosmic-blue)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Clock className="w-16 h-16 text-white" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 text-glow">
          DEVUP! <br />EPIC FEATURE
        </h1>

        <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
          Prepare yourself for an amazing <i>(and unseen)</i> feature experience.
        </p>
      </div>
    </motion.div>
  );

  const CountdownState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="text-center"
      data-testid="countdown-state"
    >
      <div className="relative">
        <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-12">
          <div className="absolute inset-0 border-8 border-white/10 rounded-full"></div>

          <motion.div
            className="absolute inset-0 border-8 border-[var(--cosmic-blue)] rounded-full transform -rotate-90"
            style={{
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent'
            }}
            animate={{
              boxShadow: [
                '0 0 20px var(--cosmic-blue)',
                '0 0 40px var(--cosmic-blue)',
                '0 0 20px var(--cosmic-blue)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-8xl md:text-9xl font-orbitron font-black text-white text-glow"
              key={countdownValue}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              data-testid="countdown-number"
            >
              {countdownValue}
            </motion.span>
          </div>
        </div>

        <motion.h2
          className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Calibrating systems
        </motion.h2>

        <p className="text-lg text-white/70 font-medium">
          Hope it works... brace yourself for impact...
        </p>
      </div>
    </motion.div>
  );

  const ExplosionState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center"
      data-testid="explosion-state"
    >
      <div className="relative">
        <div className="relative w-96 h-96 mx-auto mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-9xl"
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: [1, 1.5, 3], rotate: [0, 180, 360] }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              💥
            </motion.div>
          </div>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl font-orbitron font-black text-[var(--explosion-orange)] mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          500<br />Internal Server Error
        </motion.h2>

        <p className="text-xl text-white/80 font-medium mb-8">
          Something happened :(
        </p>

        <motion.div
          className="flex justify-center space-x-4 text-4xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, staggerChildren: 0.1 }}
        >
          {['🎊', '✨', '🎆', '💫', '🎊'].map((emoji, index) => (
            <motion.span
              key={index}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.1
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-cosmic-gradient min-h-screen overflow-hidden relative">
      <StarField />

      {/* Restart Button */}
      <AnimatePresence>
        {currentState !== 'welcome' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 left-6 z-50"
          >
            <Button
              onClick={resetFlow}
              variant="outline"
              size="sm"
              className="bg-[var(--space-medium)]/50 backdrop-blur-sm border-white/20 text-white/70 hover:bg-[var(--space-medium)]/80 hover:text-white transition-all duration-300"
              data-testid="button-restart"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center relative px-4">
        <AnimatePresence mode="wait">
          {currentState === 'welcome' && <WelcomeState key="welcome" />}
          {currentState === 'countdown' && <CountdownState key="countdown" />}
          {currentState === 'explosion' && <ExplosionState key="explosion" />}
        </AnimatePresence>
      </div>

      {/* Trigger Button */}
      <AnimatePresence>
        {currentState === 'welcome' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={startCountdown}
              size="lg"
              className="w-20 h-20 bg-gradient-to-br from-[var(--cosmic-blue)] to-[var(--electric-purple)] rounded-full shadow-2xl hover:shadow-[var(--cosmic-blue)]/50 hover:scale-110 transition-all duration-300 p-0 relative group"
              data-testid="button-start"
            >
              <Play className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" />

              <motion.div
                className="absolute -inset-2 bg-[var(--cosmic-blue)]/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle Container */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={particle.emoji ? "absolute text-4xl" : "particle"}
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.emoji ? 'transparent' : particle.color,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                y: -200,
                scale: 0,
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut"
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
