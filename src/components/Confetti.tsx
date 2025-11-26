import { useEffect, useState } from 'react';
import styles from './Confetti.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  shape: string;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

interface ConfettiProps {
  startPosition?: { x: number; y: number } | null;
}

export function Confetti({ startPosition }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#E056FD', '#686DE0'];
    const shapes = ['⭐', '✨', '🎉', '🎊', '💫', '🌟', '✦', '★'];
    
    // Criar partículas com velocidades aleatórias
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
      const velocity = 3 + Math.random() * 4;
      
      return {
        id: i,
        x: startPosition ? startPosition.x : window.innerWidth / 2,
        y: startPosition ? startPosition.y : window.innerHeight / 2,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity - 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      };
    });

    setParticles(newParticles);
  }, [startPosition]);

  return (
    <div className={styles.container}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            '--velocity-x': `${particle.velocityX * 100}px`,
            '--velocity-y': `${particle.velocityY * 100}px`,
            '--rotation-speed': `${particle.rotationSpeed}deg`,
          } as React.CSSProperties}
        >
          <div
            className={styles.particleInner}
            style={{
              color: particle.color,
            }}
          >
            {particle.shape}
          </div>
        </div>
      ))}
    </div>
  );
}
