import { ReactNode } from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  count: number;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function StatsCard({ icon, label, count, bgColor, textColor, borderColor }: StatsCardProps) {
  return (
    <div 
      className={styles.card}
      style={{ 
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`
      }}
    >
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.content}>
        <p className={styles.label} style={{ color: textColor }}>
          {label}
        </p>
        <p className={styles.count} style={{ color: textColor }}>
          {count}
        </p>
      </div>
    </div>
  );
}
