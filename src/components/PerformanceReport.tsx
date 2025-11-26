import { Gift } from '../App';
import CloseIcon from './CloseIcon';
import styles from './PerformanceReport.module.css';
import { useState } from 'react';

interface PerformanceReportProps {
  openedDays: Array<{ day: number; giftId: number }>;
  allGifts: Gift[];
  goodGiftsCount: number;
  badGiftsCount: number;
  onClose: () => void;
}

export function PerformanceReport({ 
  openedDays, 
  allGifts, 
  goodGiftsCount, 
  badGiftsCount, 
  onClose 
}: PerformanceReportProps) {
  
  const [isCapturing, setIsCapturing] = useState(false);

  const formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getPerformanceLevel = () => {
    const total = openedDays.length;
    if (total === 0) return 'N/A';
    const goodPercentage = (goodGiftsCount / total) * 100;
    
    if (goodPercentage >= 70) return 'EXCELENTE';
    if (goodPercentage >= 50) return 'BOM';
    if (goodPercentage >= 30) return 'REGULAR';
    return 'CRÍTICO';
  };

  const getStatusColor = () => {
    const level = getPerformanceLevel();
    if (level === 'EXCELENTE') return '#00ff00';
    if (level === 'BOM') return '#90EE90';
    if (level === 'REGULAR') return '#FFA500';
    return '#ff0000';
  };

  const sortedDays = [...openedDays].sort((a, b) => a.day - b.day);

  const handlePrint = () => {
    window.print();
  };

  const handleCapture = async () => {
    setIsCapturing(true);
    
    try {
      // Criar canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');
      
      // Configurações
      const width = 800;
      const padding = 32;
      const fontSize = 12;
      const lineHeight = fontSize * 1.3;
      
      canvas.width = width * 2; // 2x para qualidade
      canvas.height = 4000 * 2; // Altura temporária grande
      ctx.scale(2, 2);
      
      // Fundo
      ctx.fillStyle = '#191919';
      ctx.fillRect(0, 0, width, 4000);
      
      // Fonte
      ctx.font = `${fontSize}px "Courier New", monospace`;
      ctx.textBaseline = 'top';
      
      let y = padding;
      
      // Função auxiliar para desenhar texto
      const drawText = (text: string, x: number, color: string = '#ececec') => {
        ctx.fillStyle = color;
        const lines = text.split('\n');
        lines.forEach(line => {
          ctx.fillText(line, x, y);
          y += lineHeight;
        });
      };
      
      // Função auxiliar para desenhar linha horizontal
      const drawLine = (color: string = '#ececec') => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        y += 12;
      };
      
      // Cabeçalho
      drawText(`╔═════════════════════════════════════════════════╗
║                                                 ║
║    AVALIAÇÃO DE DESEMPENHO ANUAL 2024          ║
║         CALENDÁRIO DO ADVENTO DEV              ║
║                                                 ║
╚═════════════════════════════════════════════════╝`, padding);
      
      drawLine();
      y += 4;
      
      // Metadados
      drawText(`┌───────────────────────────────────────────────┐
│ DATA: ${formatDateTime()}                │
│ PERÍODO: Dezembro 2024                        │
│ EVENTOS: ${String(openedDays.length).padStart(2, '0')}/24                               │
└───────────────────────────────────────────────┘`, padding);
      
      y += 16;
      
      // Métricas
      const taxaSucesso = openedDays.length > 0 ? ((goodGiftsCount / openedDays.length) * 100).toFixed(1) : '0.0';
      const perfLevel = getPerformanceLevel();
      
      drawText(`╔═══════════════════════════════════════════════╗
║        MÉTRICAS DE DESEMPENHO                 ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  ✓ DEPLOYS SUCESSO: ${String(goodGiftsCount).padStart(2, '0')}                       ║
║  ✗ BUGS ENCONTRADOS: ${String(badGiftsCount).padStart(2, '0')}                      ║
║  ──────────────────────────────────────────   ║
║  ➤ TAXA SUCESSO: ${taxaSucesso}%                   ║
║  ➤ PERFORMANCE: ${perfLevel}                      ║
║                                               ║
╚═══════════════════════════════════════════════╝`, padding);
      
      y += 16;
      
      // Status
      const statusColor = getStatusColor();
      ctx.font = `${10}px "Courier New", monospace`;
      drawText(`  ███████╗████████╗ █████╗ ████████╗██╗   ██╗███████╗
  ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║   ██║██╔════╝
  ███████╗   ██║   ███████║   ██║   ██║   ██║███████╗
  ╚════██║   ██║   ██╔══██║   ██║   ██║   ██║╚════██║
  ███████║   ██║   ██║  ██║   ██║   ╚██████╔╝███████║
  ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝
                                                       
                  ${perfLevel}`, padding, statusColor);
      
      ctx.font = `${fontSize}px "Courier New", monospace`;
      y += 16;
      
      // Detalhamento
      drawText(`╔═══════════════════════════════════════════════╗
║         DETALHAMENTO DE EVENTOS                          ║
╚═══════════════════════════════════════════════╝`, padding);
      
      y += 8;
      
      // Eventos
      const sorted = [...openedDays].sort((a, b) => a.day - b.day);
      if (sorted.length === 0) {
        drawText('Nenhum evento registrado.', padding + 8);
      } else {
        sorted.forEach(opened => {
          const gift = allGifts.find(g => g.id === opened.giftId);
          if (gift) {
            const status = gift.type === 'good' ? '[✓]' : '[✗]';
            const color = gift.type === 'good' ? '#00ff00' : '#ff0000';
            const messageLines = gift.message.split('\n').map((line, i) => 
              i === 0 ? line : '│ ' + line
            ).join('\n');
            
            drawText(`
┌───────────────────────────────────────────────┐
│ DIA ${String(opened.day).padStart(2, '0')} ${status}                                       │
├───────────────────────────────────────────────┤
│ ${messageLines}
│                                               │
└───────────────────────────────────────────────┘`, padding, color);
            
            y += 8;
          }
        });
      }
      
      y += 8;
      drawLine();
      y += 4;
      
      // Rodapé
      drawText(`
─────────────────────────────────────────────────
     DOCUMENTO GERADO AUTOMATICAMENTE
 "Calendário do Advento Dev" - v1.0.0 - 2024
─────────────────────────────────────────────────

          Confidencial - Uso Interno`, padding);
      
      // Ajustar altura do canvas para o conteúdo real
      const finalHeight = y + padding;
      const finalCanvas = document.createElement('canvas');
      const finalCtx = finalCanvas.getContext('2d');
      if (!finalCtx) throw new Error('Final canvas context not available');
      
      finalCanvas.width = width * 2;
      finalCanvas.height = finalHeight * 2;
      finalCtx.drawImage(canvas, 0, 0);
      
      // Download
      const dataURL = finalCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `avaliacao_desempenho_${formatDateTime().replace(/[: ]/g, '_')}.png`;
      link.click();
      
    } catch (error) {
      console.error('Erro ao capturar imagem:', error);
      alert('Erro ao gerar imagem. Tente novamente.');
    }
    
    setIsCapturing(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={styles.backdrop}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={styles.modalContainer}>
        <div 
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão de fechar */}
          <button 
            className={`${styles.closeButton} ${styles.printHidden} hover\\:opacity-70`}
            onClick={onClose}
          >
            <CloseIcon />
          </button>

          {/* Botão de imprimir */}
          <button 
            className={`${styles.printButton} ${styles.printHidden}`}
            onClick={handlePrint}
          >
            🖨️ <span className={styles.printButtonText}>Imprimir</span>
          </button>

          {/* Botão de capturar */}
          <button 
            className={`${styles.captureButton} ${styles.printHidden}`}
            onClick={handleCapture}
            disabled={isCapturing}
          >
            📸 <span className={styles.captureButtonText}>Capturar</span>
          </button>

          {/* Conteúdo do relatório */}
          <div className={styles.reportContent}>
            
            {/* Cabeçalho */}
            <div className={styles.headerSection}>
              <pre className={styles.reportHeader}>
{`╔═════════════════════════════════════════════════╗
║                                                 ║
║    AVALIAÇÃO DE DESEMPENHO ANUAL 2024          ║
║         CALENDÁRIO DO ADVENTO DEV              ║
║                                                 ║
╚═════════════════════════════════════════════════╝`}
              </pre>
            </div>

            {/* Metadados */}
            <div className={styles.metadataSection}>
              <pre className={styles.reportMetadata}>
{`┌───────────────────────────────────────────────┐
│ DATA: ${formatDateTime()}                │
│ PERÍODO: Dezembro 2024                        │
│ EVENTOS: ${String(openedDays.length).padStart(2, '0')}/24                               │
└───────────────────────────────────────────────┘`}
              </pre>
            </div>

            {/* Métricas */}
            <div className={styles.metricsSection}>
              <pre className={styles.reportMetrics}>
{`╔═══════════════════════════════════════════════╗
║        MÉTRICAS DE DESEMPENHO                 ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  ✓ DEPLOYS SUCESSO: ${String(goodGiftsCount).padStart(2, '0')}                       ║
║  ✗ BUGS ENCONTRADOS: ${String(badGiftsCount).padStart(2, '0')}                      ║
║  ──────────────────────────────────────────   ║
║  ➤ TAXA SUCESSO: ${(openedDays.length > 0 ? ((goodGiftsCount / openedDays.length) * 100).toFixed(1) : '0.0')}%                   ║
║  ➤ PERFORMANCE: ${getPerformanceLevel()}                      ║
║                                               ║
╚═══════════════════════════════════════════════╝`}
              </pre>
            </div>

            {/* Indicador de Status */}
            <div className={styles.statusSection}>
              <pre className={styles.reportStatus} style={{ color: getStatusColor() }}>
{`
  ███████╗████████╗ █████╗ ████████╗██╗   ██╗███████╗
  ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║   ██║██╔════╝
  ███████╗   ██║   ███████║   ██║   ██║   ██║███████╗
  ╚════██║   ██║   ██╔══██║   ██║   ██║   ██║╚════██║
  ███████║   ██║   ██║  ██║   ██║   ╚██████╔╝███████║
  ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝
                                                       
                  ${getPerformanceLevel()}
`}
              </pre>
            </div>

            {/* Detalhamento */}
            <div className={styles.detailSection}>
              <pre className={styles.reportDetailHeader}>
{`╔═══════════════════════════════════════════════╗
║         DETALHAMENTO DE EVENTOS               ║
╚═══════════════════════════════════════════════╝
`}
              </pre>
              
              {sortedDays.length === 0 ? (
                <pre className={styles.noEvents}>
{`Nenhum evento registrado.`}
                </pre>
              ) : (
                sortedDays.map((opened, index) => {
                  const gift = allGifts.find(g => g.id === opened.giftId);
                  if (!gift) return null;
                  
                  const status = gift.type === 'good' ? '[✓]' : '[✗]';
                  const color = gift.type === 'good' ? '#00ff00' : '#ff0000';
                  
                  return (
                    <pre key={opened.day} className={styles.reportGiftItem} style={{ color }}>
{`
┌───────────────────────────────────────────────┐
│ DIA ${String(opened.day).padStart(2, '0')} ${status}                                       │
├───────────────────────────────────────────────┤
│ ${gift.message.split('\n').map((line, i) => 
  i === 0 ? line : '│ ' + line
).join('\n')}
│                                               │
└───────────────────────────────────────────────┘`}
                    </pre>
                  );
                })
              )}
            </div>

            {/* Rodapé */}
            <div className={styles.footerSection}>
              <pre className={styles.reportFooter}>
{`
─────────────────────────────────────────────────
     DOCUMENTO GERADO AUTOMATICAMENTE
 "Calendário do Advento Dev" - v1.0.0 - 2024
─────────────────────────────────────────────────

          Confidencial - Uso Interno
`}
              </pre>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}