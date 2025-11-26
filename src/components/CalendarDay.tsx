import { useState, useEffect, useRef } from 'react';
import StarIcon from '../imports/Vector';
import BugIcon from '../imports/Frame';
import GiftIconUnopened from '../imports/Frame-8-1211';
import LockIcon from '../imports/Lock';
import EyeIcon from '../imports/Eye';
import CloseIcon from './CloseIcon';
import styles from './CalendarDay.module.css';
import '../styles/custom.css';

interface CalendarDayProps {
  day: number;
  isOpened: boolean;
  isLocked: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  gift?: { message: string; type: 'good' | 'bad' } | null;
}

export function CalendarDay({ day, isOpened, isLocked, onClick, gift }: CalendarDayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openedDateTime, setOpenedDateTime] = useState<Date | null>(null);
  const [canHover, setCanHover] = useState(false);
  const previousIsOpenedRef = useRef<boolean | null>(null);
  const hasJustOpened = useRef(false);

  // Habilitar hover após um pequeno delay no mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanHover(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Quando o dia é aberto pela primeira vez durante a sessão atual, expandir automaticamente
  useEffect(() => {
    // Se é o primeiro render, apenas guardar o estado inicial
    if (previousIsOpenedRef.current === null) {
      previousIsOpenedRef.current = isOpened;
      return;
    }

    // Se mudou de não-aberto para aberto durante a sessão, expandir
    if (previousIsOpenedRef.current === false && isOpened === true && !hasJustOpened.current) {
      hasJustOpened.current = true;
      setIsExpanded(true);
      setOpenedDateTime(new Date());
      
      // Auto-fechar após 3 segundos
      setTimeout(() => {
        setIsExpanded(false);
        hasJustOpened.current = false;
      }, 3000);
    }
    
    previousIsOpenedRef.current = isOpened;
  }, [isOpened]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLocked) {
      if (isOpened) {
        setIsExpanded(!isExpanded);
      }
      onClick(event);
    }
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const handleBackdropClick = () => {
    setIsExpanded(false);
  };

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayNum = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${dayNum} ${hours}:${minutes}:${seconds}`;
  };

  const isGoodGift = gift?.type === 'good';
  const isBadGift = gift?.type === 'bad';

  // Card não aberto (vermelho)
  if (!isOpened && !isLocked) {
    return (
      <div className={styles.wrapper}>
        <button
          onClick={handleClick}
          className={`${styles.button} ${styles.buttonUnopened}`}
        >
          {/* Número do dia */}
          <div className={styles.dayNumber}>
            <span className={styles.dayNumberText}>{day}</span>
          </div>

          {/* Ícone de presente central */}
          <div className={styles.iconCenter}>
            <div className={styles.iconLarge}>
              <GiftIconUnopened />
            </div>
          </div>

          {/* Ícone de olho no canto inferior direito */}
          <div className={styles.iconBottomRight}>
            <div className={styles.iconSmall}>
              <EyeIcon />
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Card bloqueado
  if (isLocked) {
    return (
      <div className={styles.wrapper}>
        <button
          disabled
          className={`${styles.button} ${styles.buttonLocked}`}
        >
          {/* Número do dia */}
          <div className={styles.dayNumber}>
            <span className={styles.dayNumberText}>{day}</span>
          </div>

          {/* Ícone de presente central */}
          <div className={styles.iconCenter}>
            <div className={styles.iconLarge}>
              <GiftIconUnopened />
            </div>
          </div>

          {/* Ícone de cadeado no canto inferior direito */}
          <div className={styles.iconBottomRight}>
            <div className={styles.iconSmall}>
              <LockIcon />
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Modal expandido para presente bom
  if (isGoodGift && isExpanded) {
    return (
      <>
        {/* Backdrop com blur */}
        <div 
          className={styles.backdrop}
          onClick={handleBackdropClick}
        />
        
        {/* Modal centralizado */}
        <div className={styles.modalContainer}>
          <div 
            className={`${styles.modalContent} ${styles.modalContentGood}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button 
              className={`${styles.closeButton} ${styles.closeButtonGood} hover\\:opacity-70`}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </button>

            <div className={styles.modalInner}>
              {/* Cabeçalho com data */}
              <div className={`${styles.modalHeader} ${styles.modalHeaderGood}`}>
                <p>papai@noel {openedDateTime ? formatDateTime(openedDateTime) : formatDateTime(new Date())}</p>
                <p>(feat/happy)</p>
              </div>
              
              {/* Ícone e título alinhados */}
              <div className={styles.modalTitle}>
                <div className={styles.modalIcon}>
                  <StarIcon />
                </div>
                <p className={`${styles.modalTitleText} ${styles.modalTitleTextGood}`}>Opa, deu boa!</p>
              </div>
              
              <div className={styles.modalMessage}>
                <p className={`${styles.modalMessageText} ${styles.modalMessageTextGood}`}>
                  {gift.message}
                </p>
              </div>

              {/* Número do dia no canto */}
              <div className={styles.modalFooter}>
                <span className={`${styles.modalFooterText} ${styles.modalFooterTextGood}`}>{day}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Card bom aberto (verde escuro com borda amarela)
  if (isGoodGift) {
    return (
      <div className={styles.wrapper}>
        <button
          onClick={handleClick}
          className={`${styles.button} ${styles.buttonGood}`}
        >
          <div className={styles.cardContent}>
            {/* Ícone e título alinhados */}
            <div className={styles.cardHeader}>
              <div className={styles.iconTiny}>
                <StarIcon />
              </div>
              <p className={styles.cardTitleGood}>Opa, deu boa!</p>
            </div>
            <div className={`${styles.cardMessage} ${styles.cardMessageGood}`}>
              {gift.message}
            </div>
          </div>
          {/* Número do dia no canto */}
          <div className={styles.iconBottomRight}>
            <span className={styles.dayNumberTextOpacity}>{day}</span>
          </div>
        </button>
      </div>
    );
  }

  // Modal expandido para presente ruim
  if (isBadGift && isExpanded) {
    return (
      <>
        {/* Backdrop com blur */}
        <div 
          className={styles.backdrop}
          onClick={handleBackdropClick}
        />
        
        {/* Modal centralizado */}
        <div className={styles.modalContainer}>
          <div 
            className={`${styles.modalContent} ${styles.modalContentBad}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button 
              className={`${styles.closeButton} ${styles.closeButtonBad} hover\\:opacity-70`}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </button>

            <div className={styles.modalInner}>
              {/* Cabeçalho com data */}
              <div className={`${styles.modalHeader} ${styles.modalHeaderBad}`}>
                <p>papai@noel {openedDateTime ? formatDateTime(openedDateTime) : formatDateTime(new Date())}</p>
                <p>(fix/bug)</p>
              </div>
              
              {/* Ícone e título alinhados */}
              <div className={styles.modalTitle}>
                <div className={styles.modalIcon}>
                  <BugIcon />
                </div>
                <p className={`${styles.modalTitleText} ${styles.modalTitleTextBad}`}>Ihhh, bugou!</p>
              </div>
              
              <div className={styles.modalMessage}>
                <p className={`${styles.modalMessageText} ${styles.modalMessageTextBad}`}>
                  {gift.message}
                </p>
              </div>

              {/* Número do dia no canto */}
              <div className={styles.modalFooter}>
                <span className={`${styles.modalFooterText} ${styles.modalFooterTextBad}`}>{day}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Card ruim aberto (branco/bege com borda vermelha tracejada)
  if (isBadGift) {
    return (
      <div className={styles.wrapper}>
        <button
          onClick={handleClick}
          className={`${styles.button} ${styles.buttonBad}`}
        >
          <div className={styles.cardContent}>
            {/* Ícone e título alinhados */}
            <div className={styles.cardHeader}>
              <div className={styles.iconTiny}>
                <BugIcon />
              </div>
              <p className={styles.cardTitleBad}>Ihhh, bugou!</p>
            </div>
            <div className={`${styles.cardMessage} ${styles.cardMessageBad}`}>
              {gift.message}
            </div>
          </div>
          {/* Número do dia no canto */}
          <div className={styles.iconBottomRight}>
            <span className={styles.dayNumberTextGray}>{day}</span>
          </div>
        </button>
      </div>
    );
  }

  return null;
}