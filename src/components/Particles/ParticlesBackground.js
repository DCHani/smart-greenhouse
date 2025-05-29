import React from 'react';
import particlesConfig from './particlesConfig';

// Simple Canvas Particle System
class ParticlesBackground extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.particles = [];
    this.animationFrame = null;
  }

  componentDidMount() {
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;
    
    // Create initial particles
    this.createParticles();
    
    // Start animation loop
    this.animate();
    
    // Add event listeners
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('click', this.handleClick);
    

  }

  componentWillUnmount() {
    // Clean up
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('click', this.handleClick);

    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
  


  handleResize = () => {
    if (this.canvasRef.current) {
      const canvas = this.canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.createParticles(); // Recreate particles for new dimensions
    }
  }

  initCanvas = () => {
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }

  createParticles = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    this.particles = [];
    const config = particlesConfig;
    const particleCount = config.behavior.count;

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 
        (config.particle.radius.max - config.particle.radius.min) + 
        config.particle.radius.min;
      
      const opacity = Math.random() * 
        (config.particle.opacity.max - config.particle.opacity.min) + 
        config.particle.opacity.min;
      
      const speed = Math.random() * 
        (config.behavior.speed.max - config.behavior.speed.min) + 
        config.behavior.speed.min;
      
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        color: config.particle.color,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: opacity,
        originalX: 0,
        originalY: 0,
        isAttracted: false
      });
    }
  }

  drawParticles = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    this.particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.hexToRgb(particle.color)}, ${particle.opacity})`;
      ctx.fill();
      
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce on edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
    });
    
    // Draw connections
    this.drawConnections();
  }

  drawConnections = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    const config = particlesConfig;
    if (!config.connections.enable) return;

    const ctx = canvas.getContext('2d');
    const maxDistance = config.connections.maxDistance;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // The closer the particles, the more opaque the line
          const opacity = config.connections.opacity * (1 - distance / maxDistance);
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.strokeStyle = `rgba(${this.hexToRgb(config.connections.color)}, ${opacity})`;
          ctx.lineWidth = config.connections.width;
          ctx.stroke();
        }
      }
    }
  }

  // Mouse interaction handlers
  handleMouseMove = (e) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    const config = particlesConfig;
    if (!config.interactivity.hover.enable) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    this.particles.forEach(particle => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Repel particles when mouse is close
      if (distance < config.interactivity.hover.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (config.interactivity.hover.radius - distance) / 10;
        
        // Apply force away from mouse
        particle.speedX -= Math.cos(angle) * force * config.interactivity.hover.repulseStrength;
        particle.speedY -= Math.sin(angle) * force * config.interactivity.hover.repulseStrength;
      }
    });
  }
  
  handleClick = (e) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    const config = particlesConfig;
    if (!config.interactivity.click.enable) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Add new particles at click position based on config
    for (let i = 0; i < config.interactivity.click.addParticles; i++) {
      const radius = Math.random() * 
        (config.particle.radius.max - config.particle.radius.min) + 
        config.particle.radius.min;
      
      const opacity = Math.random() * 
        (config.particle.opacity.max - config.particle.opacity.min) + 
        config.particle.opacity.min;
        
      const speed = config.interactivity.click.particleSpeed;
      
      this.particles.push({
        x: mouseX,
        y: mouseY,
        radius: radius,
        color: config.particle.color,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: opacity,
        originalX: 0,
        originalY: 0,
        isAttracted: false
      });
    }
  }
  
  // Convert hex color to RGB for use in rgba()  
  hexToRgb = (hex) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Return as comma-separated string for rgba()
    return `${r}, ${g}, ${b}`;
  }
  
  animate = () => {
    this.drawParticles();
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  render() {
    return (
      <canvas 
        ref={this.canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
    );
  }
}

export default ParticlesBackground;
