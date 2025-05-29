// Configuration for our custom Canvas particles animation
const particlesConfig = {
  // Particle appearance
  particle: {
    color: '#4CAF50',  // Primary color (green)
    radius: { min: 1, max: 4 },
    opacity: { min: 0.2, max: 0.7 },
  },
  
  // Particle behavior
  behavior: {
    count: 60,          // Number of particles to create
    speed: { min: 0.1, max: 0.8 },
    bounce: true,      // Bounce off edges
  },
  
  // Connection lines
  connections: {
    enable: true,
    color: '#4CAF50',  
    opacity: 0.3,       // Base opacity
    maxDistance: 100,  // Max distance to draw connections
    width: 1,          // Line width
  },
  
  // Interactivity
  interactivity: {
    hover: {
      enable: true,
      radius: 80,      // Distance at which particles react to mouse
      repulseStrength: 0.5,
    },
    click: {
      enable: true,
      addParticles: 5,  // Number of particles to add on click
      particleSpeed: 3, // Speed of new particles
    }
  }
};

export default particlesConfig;
