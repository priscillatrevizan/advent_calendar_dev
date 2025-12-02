import backgroundImage from 'figma:asset/eec5f74765112a6f78ba2b4964d3e89d165d30b9.png';
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { CalendarDay } from './components/CalendarDay';
import { Confetti } from './components/Confetti';
import { CrawlingBug } from './components/CrawlingBug';
import { PerformanceReport } from './components/PerformanceReport';
import { StatsCard } from './components/StatsCard';
import BugIcon from './imports/Frame';
import TreeIcon from './imports/Frame-8-592';
import StarIcon from './imports/Vector';

export interface Gift {
  id: number;
  message: string;
  type: 'good' | 'bad';
}

const GOOD_GIFTS: Gift[] = [
  { id: 1, message: "Férias de 24/12 à 04/01 sem precisar deixar nada documentado às pressas.", type: 'good' },
  { id: 2, message: "Seu código passa na primeira tentativa em 100% dos testes unitários e de integração.", type: 'good' },
  { id: 3, message: "A feature que você implementou se torna a mais usada da aplicação.", type: 'good' },
  { id: 4, message: "O cliente aceita o orçamento sem pedir por \"só mais uma coisinha\".", type: 'good' },
  { id: 5, message: "Você ganha um monitor ultrawide de última geração.", type: 'good' },
  { id: 6, message: "A performance do seu serviço melhorou em 50% apenas limpando um cache.", type: 'good' },
  { id: 7, message: "Stack Overflow tem a resposta exata para o seu problema, no primeiro resultado.", type: 'good' },
  { id: 8, message: "O merge de uma branch de 6 meses é feito sem nenhum conflito.", type: 'good' },
  { id: 9, message: "Seu Pull Request é aprovado em 5 minutos sem nenhum comentário.", type: 'good' },
  { id: 10, message: "Você recebe um vale-presente de R$ 500 para cursos e livros de tecnologia.", type: 'good' },
  { id: 11, message: "Seu deploy de sexta-feira à tarde ocorre sem falhas e sem vigilância.", type: 'good' },
  { id: 12, message: "Um bug antigo e irritante se resolve misteriosamente sozinho.", type: 'good' },
  { id: 13, message: "O time de QA te elogia publicamente pela qualidade do código.", type: 'good' },
  { id: 14, message: "Você encontra um atalho de teclado novo que acelera seu trabalho.", type: 'good' },
  { id: 15, message: "Seu café está sempre quente e no ponto ideal durante o dia todo.", type: 'good' },
  { id: 16, message: "Você descobre que seu código pode ser reduzido em 80% usando um método nativo.", type: 'good' },
  { id: 17, message: "O CEO te manda uma mensagem de parabéns pelo projeto.", type: 'good' },
  { id: 18, message: "O time decide migrar de reunião diária de 1h para uma de 15 minutos.", type: 'good' },
  { id: 19, message: "Você encontra documentação perfeita, completa e atualizada.", type: 'good' },
  { id: 20, message: "Seu computador é trocado por um modelo com 64GB de RAM e SSD NVMe.", type: 'good' },
  { id: 21, message: "O build do projeto, que demorava 10 minutos, agora leva 30 segundos.", type: 'good' },
  { id: 22, message: "Você aprende uma nova tecnologia que é divertida e útil ao mesmo tempo.", type: 'good' },
  { id: 23, message: "Seu mentor te oferece uma sessão de coaching sobre um tema que você ama.", type: 'good' },
  { id: 24, message: "O ambiente de homologação está sempre idêntico ao de produção.", type: 'good' },
  { id: 25, message: "Sua query de banco de dados mais complexa executa em 1 milissegundo.", type: 'good' },
  { id: 26, message: "Você recebe 100% de cobertura nos testes de código legado.", type: 'good' },
  { id: 27, message: "O time de infraestrutura te dá acesso total de root na sua máquina local.", type: 'good' },
  { id: 28, message: "Você ganha um fone de ouvido com cancelamento de ruído de ponta.", type: 'good' },
  { id: 29, message: "O próximo projeto será escrito do zero na sua stack favorita.", type: 'good' },
  { id: 30, message: "O time de design te entrega todos os assets no formato correto e otimizado.", type: 'good' },
  { id: 31, message: "Você descobre que a ferramenta de linting te salvou de um erro grave.", type: 'good' },
  { id: 32, message: "A Internet na sua casa não cai durante nenhuma sprint review.", type: 'good' },
  { id: 33, message: "Seu teclado mecânico favorito está em promoção e você o compra.", type: 'good' },
  { id: 34, message: "O framework que você usa lança uma atualização que corrige todos os seus problemas.", type: 'good' },
  { id: 35, message: "Você encontra um colega que ama refatorar tanto quanto você.", type: 'good' },
  { id: 36, message: "O time de marketing te traz métricas que comprovam o valor do seu trabalho.", type: 'good' },
  { id: 37, message: "Sua linguagem de programação favorita tem a maior alta no índice TIOBE.", type: 'good' },
  { id: 38, message: "Você recebe um bônus salarial inesperado no final do ano.", type: 'good' },
  { id: 39, message: "A máquina virtual para o ambiente de desenvolvimento é pré-configurada em 1 minuto.", type: 'good' },
  { id: 40, message: "Você consegue automatizar uma tarefa repetitiva que consumia horas semanais.", type: 'good' },
  { id: 41, message: "A biblioteca que você precisa tem um excelente suporte a TypeScript.", type: 'good' },
  { id: 42, message: "Você recebe um convite para um congresso de tecnologia all-inclusive.", type: 'good' },
  { id: 43, message: "Seu código é escolhido como exemplo de \"boas práticas\" na empresa.", type: 'good' },
  { id: 44, message: "O seu horário de almoço é estendido em 30 minutos permanentemente.", type: 'good' },
  { id: 45, message: "Um feature flag que você implementou te salva de um rollback nobre.", type: 'good' },
  { id: 46, message: "Você faz 8 horas de foco ininterrupto e produtivo.", type: 'good' },
  { id: 47, message: "O time de segurança te parabeniza por não encontrar nenhuma vulnerabilidade no seu código.", type: 'good' },
  { id: 48, message: "Você resolve um problema complexo com apenas 3 linhas de código.", type: 'good' },
  { id: 49, message: "Seus comentários de código são claros, concisos e úteis para todos.", type: 'good' },
  { id: 50, message: "A sala de reunião para a retrospectiva está sempre com ar-condicionado na temperatura perfeita.", type: 'good' },
];

const BAD_GIFTS: Gift[] = [
  { id: 51, message: "Bug em produção, corre pro war room.", type: 'bad' },
  { id: 52, message: "Você descobre que o database de produção é uma planilha Excel oculta.", type: 'bad' },
  { id: 53, message: "Seu deploy de sexta-feira à tarde quebra e você precisa fazer rollback manual.", type: 'bad' },
  { id: 54, message: "Sua tela ultrawide é substituída por duas telas de 15 polegadas em resolução diferente.", type: 'bad' },
  { id: 55, message: "O Pull Request de uma linha recebe 50 comentários e um debate filosófico sobre a vírgula.", type: 'bad' },
  { id: 56, message: "Seu computador precisa atualizar o Windows bem no meio de uma reunião importante.", type: 'bad' },
  { id: 57, message: "O cliente pede para refazer todo o projeto porque \"a cor não é a que ele imaginava\".", type: 'bad' },
  { id: 58, message: "O time decide migrar para a linguagem que você mais detesta.", type: 'bad' },
  { id: 59, message: "Você herda o projeto mais antigo e menos documentado da empresa.", type: 'bad' },
  { id: 60, message: "Sua query que funcionava perfeitamente no local agora causa deadlock no banco de dados.", type: 'bad' },
  { id: 61, message: "A empresa decide adotar reuniões diárias de 2 horas em pé.", type: 'bad' },
  { id: 62, message: "A documentação do seu projeto foi acidentalmente deletada.", type: 'bad' },
  { id: 63, message: "Você passa 4 horas depurando e o erro era um ponto-e-vírgula.", type: 'bad' },
  { id: 64, message: "Seu café está sempre frio 1 minuto após ser preparado.", type: 'bad' },
  { id: 65, message: "O time de QA descobre um bug edge case que só ocorre em 0,001% dos casos.", type: 'bad' },
  { id: 66, message: "Você precisa dar suporte ao código de alguém que está de férias.", type: 'bad' },
  { id: 67, message: "Seu notebook fica sem bateria no exato momento que você não salvou o código.", type: 'bad' },
  { id: 68, message: "O manager te chama para uma reunião de 1h sem pauta definida.", type: 'bad' },
  { id: 69, message: "A Internet na sua casa começa a cair de 5 em 5 minutos.", type: 'bad' },
  { id: 70, message: "Você tem que lidar com um problema de encoding de 15 anos atrás.", type: 'bad' },
  { id: 71, message: "Seu teclado mecânico começa a falhar na tecla Enter.", type: 'bad' },
  { id: 72, message: "O time de design decide trocar todas as fontes do projeto.", type: 'bad' },
  { id: 73, message: "Você descobre que o código legado usa uma biblioteca abandonada há 8 anos.", type: 'bad' },
  { id: 74, message: "A sua máquina virtual de desenvolvimento é permanentemente lenta.", type: 'bad' },
  { id: 75, message: "Seu colega de trabalho insiste em usar tabs em vez de espaços.", type: 'bad' },
  { id: 76, message: "Você é designado para a manutenção de um sistema em COBOL.", type: 'bad' },
  { id: 77, message: "O time de infraestrutura bloqueia o acesso ao Stack Overflow na rede da empresa.", type: 'bad' },
  { id: 78, message: "O prazo de entrega do projeto foi reduzido pela metade.", type: 'bad' },
  { id: 79, message: "Você tem que dar treinamento para a equipe de vendas sobre a nova API.", type: 'bad' },
  { id: 80, message: "O linter do projeto tem regras que mudam a cada commit.", type: 'bad' },
  { id: 81, message: "Você descobre que seu código foi copiado de um fórum obscuro em 2005.", type: 'bad' },
  { id: 82, message: "Seu headset de trabalho quebra e você tem que usar o microfone embutido.", type: 'bad' },
  { id: 83, message: "O log de erro tem 500.000 linhas, mas o erro real está no final.", type: 'bad' },
  { id: 84, message: "Você precisa criar um manual de 50 páginas para uma feature simples.", type: 'bad' },
  { id: 85, message: "O time de produto te envia 30 novos requisitos na última semana da sprint.", type: 'bad' },
  { id: 86, message: "Você perde 2 horas tentando entender por que o CSS não está funcionando.", type: 'bad' },
  { id: 87, message: "Seu alias favorito do terminal para de funcionar misteriosamente.", type: 'bad' },
  { id: 88, message: "Você tem que migrar de framework em 24 horas.", type: 'bad' },
  { id: 89, message: "A issue que você fechou é reaberta pelo mesmo bug 5 minutos depois.", type: 'bad' },
  { id:90, message: "O time de segurança te pede para refazer todos os passwords e chaves de acesso.", type: 'bad' },
  { id: 91, message: "Você precisa participar de um hackathon de 48 horas obrigatório.", type: 'bad' },
  { id: 92, message: "Você descobre que o nome da sua branch está com erro de digitação.", type: 'bad' },
  { id: 93, message: "O merge de sua branch causa a exclusão acidental de uma feature crucial.", type: 'bad' },
  { id: 94, message: "Seu mouse começa a apresentar double-click aleatório.", type: 'bad' },
  { id: 95, message: "Você tem que resolver um problema de fuso horário que envolve 5 países.", type: 'bad' },
  { id: 96, message: "O cliente pede para você usar Comic Sans como fonte principal.", type: 'bad' },
  { id: 97, message: "O time adota uma nova metodologia ágil que ninguém entende.", type: 'bad' },
  { id: 98, message: "Você tem que debugar um código que usa 15 níveis de aninhamento.", type: 'bad' },
  { id: 99, message: "A impressora da empresa quebra e você precisa imprimir um relatório urgente.", type: 'bad' },
  { id: 100, message: "O ambiente de staging é desativado para \"economia de custos\".", type: 'bad' },
];

const ALL_GIFTS = [...GOOD_GIFTS, ...BAD_GIFTS];

interface OpenedDay {
  day: number;
  giftId: number;
}

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [openedDays, setOpenedDays] = useState<OpenedDay[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBug, setShowBug] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number } | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [showExtraGift, setShowExtraGift] = useState(false);
  const [showPerformanceReport, setShowPerformanceReport] = useState(false);
  const [confettiTimeoutId, setConfettiTimeoutId] = useState<number | null>(null);
  const [bugTimeoutId, setBugTimeoutId] = useState<number | null>(null);

  // Inicializar dados do localStorage
  useEffect(() => {
    const storedDays = localStorage.getItem('adventCalendar_openedDays');
    if (storedDays) {
      setOpenedDays(JSON.parse(storedDays));
    }

    // Para testes, você pode mudar o dia atual aqui
    // Descomente a linha abaixo para testar diferentes dias
    // setCurrentDay(5);
    
    // Usar data real do sistema
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = Janeiro, 11 = Dezembro
    const currentDayOfMonth = now.getDate();
    
    // Se estamos em dezembro (mês 11), usar o dia atual
    // Senão, liberar todos os dias (para testes fora de dezembro)
    if (currentMonth === 11) {
      setCurrentDay(Math.min(currentDayOfMonth, 24)); // Limitar a 24
    } else {
      // Fora de dezembro, liberar todos os dias para teste
      setCurrentDay(24);
    }
  }, []);

  const handleDayClick = (day: number) => {
    // Verificar se o dia já foi aberto
    const alreadyOpened = openedDays.find(d => d.day === day);
    if (alreadyOpened) {
      // Mostrar o presente já sorteado
      const gift = ALL_GIFTS.find(g => g.id === alreadyOpened.giftId);
      if (gift) {
        triggerAnimation(gift.type);
      }
      return;
    }

    // Verificar se o dia está liberado
    if (day > currentDay) {
      return;
    }

    // Sortear um presente que ainda não foi usado
    const usedGiftIds = openedDays.map(d => d.giftId);
    const availableGifts = ALL_GIFTS.filter(g => !usedGiftIds.includes(g.id));

    if (availableGifts.length === 0) {
      alert('Todos os presentes já foram sorteados!');
      return;
    }

    // Sortear aleatoriamente
    const randomIndex = Math.floor(Math.random() * availableGifts.length);
    const newGift = availableGifts[randomIndex];

    // Atualizar estado e localStorage
    const newOpenedDays = [...openedDays, { day, giftId: newGift.id }];
    setOpenedDays(newOpenedDays);
    localStorage.setItem('adventCalendar_openedDays', JSON.stringify(newOpenedDays));

    // Mostrar presente e ativar animação
    triggerAnimation(newGift.type);
  };

  const handleDayClickWithPosition = (day: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    setClickedPosition({ x, y });
    handleDayClick(day);
  };

  const triggerAnimation = (type: 'good' | 'bad') => {
    // Limpar timeouts anteriores para evitar sobreposição
    if (confettiTimeoutId) {
      clearTimeout(confettiTimeoutId);
      setConfettiTimeoutId(null);
    }
    if (bugTimeoutId) {
      clearTimeout(bugTimeoutId);
      setBugTimeoutId(null);
    }

    // Limpar estados anteriores antes de mostrar nova animação
    setShowConfetti(false);
    setShowBug(false);

    // Aguardar um frame para garantir que os estados foram limpos
    requestAnimationFrame(() => {
      if (type === 'good') {
        setShowConfetti(true);
        const timeoutId = window.setTimeout(() => {
          setShowConfetti(false);
          setExpandedDay(null);
          setConfettiTimeoutId(null);
        }, 5000);
        setConfettiTimeoutId(timeoutId);
      } else {
        setShowBug(true);
        const timeoutId = window.setTimeout(() => {
          setShowBug(false);
          setExpandedDay(null);
          setBugTimeoutId(null);
        }, 8000);
        setBugTimeoutId(timeoutId);
      }
    });
  };

  const closeModal = () => {
    setShowBug(false);
  };

  const resetCalendar = () => {
    if (confirm('Tem certeza que deseja resetar o calendário? Todos os presentes abertos serão perdidos.')) {
      localStorage.removeItem('adventCalendar_openedDays');
      setOpenedDays([]);
      setShowConfetti(false);
      setShowBug(false);
      setExpandedDay(null);
      setShowExtraGift(false);
      if (confettiTimeoutId) clearTimeout(confettiTimeoutId);
      if (bugTimeoutId) clearTimeout(bugTimeoutId);
    }
  };

  const isDayOpened = (day: number) => {
    return openedDays.some(d => d.day === day);
  };

  const isDayLocked = (day: number) => {
    return day > currentDay;
  };

  const getGiftForDay = (day: number) => {
    const openedDay = openedDays.find(d => d.day === day);
    if (!openedDay) return null;
    const gift = ALL_GIFTS.find(g => g.id === openedDay.giftId);
    return gift || null;
  };

  // Calcular estatísticas
  const goodGiftsCount = openedDays.filter(d => {
    const gift = ALL_GIFTS.find(g => g.id === d.giftId);
    return gift?.type === 'good';
  }).length;

  const badGiftsCount = openedDays.filter(d => {
    const gift = ALL_GIFTS.find(g => g.id === d.giftId);
    return gift?.type === 'bad';
  }).length;

  // Verificar se todos os 24 presentes foram abertos
  const allPresentsOpened = openedDays.length === 24;

  // Determinar mensagem do presente extra
  const getExtraGiftMessage = () => {
    if (badGiftsCount > goodGiftsCount) {
      return "Caraca meu... você gerou tanto bug nessa bagaça que praser ruim tem que melhorar muito!\nVolta ano que ve se vc refatorou bem essa sua sorte";
    } else {
      return "ôloco, assim você vai deixar P.O. tão feliz ponto de te deixar tirar uns dias de recesso!\nMas volta ano que vem hein?!?";
    }
  };

  return (
    <div className={styles.container} style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat'
    }}>
      {/* Overlay para melhorar legibilidade */}
      <div className={styles.overlay}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={styles.headerIcon}>
              <TreeIcon />
            </div>
            <h1 className={styles.title}>Calendário do Advento Dev 2024</h1>
            <div className={styles.headerIcon}>
              <TreeIcon />
            </div>
          </div>
          <p className={styles.subtitle}>
            Abra uma janelinha por dia e descubra seu presente!
          </p>
          <p className={styles.currentDay}>
            Dia atual: <span className={styles.currentDayHighlight}>{currentDay}</span> de dezembro
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className={styles.statsGrid}>
          <StatsCard
            icon={<StarIcon />}
            label="Deploys com Sucesso"
            count={goodGiftsCount}
            bgColor="#1a3a2a"
            textColor="#d4af37"
            borderColor="#d4af37"
          />
          <StatsCard
            icon={<BugIcon />}
            label="Bugs Encontrados"
            count={badGiftsCount}
            bgColor="#f5f5dc"
            textColor="#dc143c"
            borderColor="#dc143c"
          />
        </div>

        {/* Botão Presente Extra - Aparece quando todos os presentes foram abertos */}
        {allPresentsOpened && (
          <div className={styles.extraGiftWrapper}>
            <button
              onClick={() => setShowExtraGift(true)}
              className={styles.christmasLightsBtn}
            >
              PRESENTE EXTRA 2025
            </button>
          </div>
        )}

        <div className={styles.calendarGrid}>
          {Array.from({ length: 24 }, (_, i) => i + 1).map((day) => (
            <CalendarDay
              key={day}
              day={day}
              isOpened={isDayOpened(day)}
              isLocked={isDayLocked(day)}
              onClick={(event) => handleDayClickWithPosition(day, event)}
              gift={getGiftForDay(day)}
            />
          ))}
        </div>

        <div className={styles.footer}>
                
          {/* Botões de ação */}
          <div className={styles.actionButtons}>
            {openedDays.length > 0 && (
              <button
                onClick={() => setShowPerformanceReport(true)}
                className={styles.reportButton}
              >
                📊 Gerar Avaliação de Desempenho
              </button>
            )}
            
            {/* Botão Resetar Calendário - Comentado para uso em produção */}
            {/* <button
              onClick={resetCalendar}
              className={styles.resetButton}
            >
              Resetar Calendário
            </button> */}
          </div>
        </div>
      </div>

      {showConfetti && <Confetti startPosition={clickedPosition} />}
      {showBug && <CrawlingBug startPosition={clickedPosition} />}

      {/* Modal de Relatório de Performance */}
      {showPerformanceReport && (
        <PerformanceReport
          openedDays={openedDays}
          allGifts={ALL_GIFTS}
          goodGiftsCount={goodGiftsCount}
          badGiftsCount={badGiftsCount}
          onClose={() => setShowPerformanceReport(false)}
        />
      )}
    </div>
  );
}