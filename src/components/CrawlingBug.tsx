import { useEffect, useState } from 'react';
import styles from './CrawlingBug.module.css';

interface CrawlingBugProps {
  startPosition?: { x: number; y: number } | null;
}

interface Bug {
  id: number;
  startX: number;
  startY: number;
  speed: number;
  angle: number;
  turnRate: number;
  zigzagIntensity: number;
}

function SingleBug({ bug }: { bug: Bug }) {
  const [position, setPosition] = useState({ x: bug.startX, y: bug.startY });
  const [rotation, setRotation] = useState(bug.angle);

  useEffect(() => {
    let animationFrame: number;
    let time = 0;
    let currentAngle = bug.angle;
    let currentX = bug.startX;
    let currentY = bug.startY;
    
    const animate = () => {
      time += 0.016; // ~60fps
      
      // Muda de direção gradualmente (movimento orgânico)
      currentAngle += (Math.sin(time * bug.turnRate) * 0.5);
      
      // Adiciona variação aleatória ocasional na direção
      if (Math.random() < 0.02) {
        currentAngle += (Math.random() - 0.5) * 30;
      }
      
      // Movimento baseado no ângulo atual
      const speed = bug.speed * 0.3;
      currentX += Math.cos(currentAngle * Math.PI / 180) * speed;
      currentY += Math.sin(currentAngle * Math.PI / 180) * speed;
      
      // Adiciona zigue-zague sutil
      const zigzag = Math.sin(time * 5) * bug.zigzagIntensity * 0.05;
      const perpAngle = currentAngle + 90;
      currentX += Math.cos(perpAngle * Math.PI / 180) * zigzag;
      currentY += Math.sin(perpAngle * Math.PI / 180) * zigzag;
      
      setPosition({ x: currentX, y: currentY });
      setRotation(currentAngle);
      
      // Para quando sair da tela (com margem maior)
      if (currentX > 120 || currentX < -20 || currentY > 120 || currentY < -20) {
        return;
      }
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [bug]);

  return (
    <div
      className={styles.bug}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* Barata animada */}
      <div className={styles.bugBody}>
        {/* Corpo */}
        <div className={styles.bodyMain}>
          {/* Cabeça */}
          <div className={styles.head}>
            {/* Antenas */}
            <div className={`${styles.antenna} ${styles.antennaLeft}`}></div>
            <div className={`${styles.antenna} ${styles.antennaRight}`}></div>
          </div>
          
          {/* Listras no corpo */}
          <div className={`${styles.stripes} ${styles.stripe1}`}></div>
          <div className={`${styles.stripes} ${styles.stripe2}`}></div>
          <div className={`${styles.stripes} ${styles.stripe3}`}></div>
          
          {/* Pernas - esquerda */}
          <div className={`${styles.leg} ${styles.legLeft1}`}></div>
          <div className={`${styles.leg} ${styles.legLeft2}`}></div>
          <div className={`${styles.leg} ${styles.legLeft3}`}></div>
          
          {/* Pernas - direita */}
          <div className={`${styles.leg} ${styles.legRight1}`}></div>
          <div className={`${styles.leg} ${styles.legRight2}`}></div>
          <div className={`${styles.leg} ${styles.legRight3}`}></div>
        </div>
      </div>
    </div>
  );
}

export function CrawlingBug({ startPosition }: CrawlingBugProps) {
  const [bugs, setBugs] = useState<Bug[]>([]);

  useEffect(() => {
    const startX = startPosition ? (startPosition.x / window.innerWidth) * 100 : 50;
    const startY = startPosition ? (startPosition.y / window.innerHeight) * 100 : 50;
    
    // Criar múltiplos insetos (entre 8 e 12 para melhor cobertura)
    const bugCount = Math.floor(Math.random() * 5) + 8;
    
    const newBugs: Bug[] = Array.from({ length: bugCount }, (_, i) => {
      // Distribui os bugs em diferentes ângulos iniciais (360 graus)
      const baseAngle = (360 / bugCount) * i;
      const angleVariation = (Math.random() - 0.5) * 60; // Variação de ±30 graus
      
      return {
        id: i,
        startX: startX + (Math.random() - 0.5) * 5,
        startY: startY + (Math.random() - 0.5) * 5,
        speed: 1.5 + Math.random() * 1.5, // Velocidade entre 1.5 e 3
        angle: baseAngle + angleVariation,
        turnRate: 0.5 + Math.random() * 1.5, // Taxa de mudança de direção
        zigzagIntensity: 0.5 + Math.random() * 1, // Intensidade do zigue-zague
      };
    });
    
    setBugs(newBugs);
  }, [startPosition]);

  return (
    <div className={styles.container}>
      {bugs.map((bug) => (
        <SingleBug key={bug.id} bug={bug} />
      ))}
    </div>
  );
}
