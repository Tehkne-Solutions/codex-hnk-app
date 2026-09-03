'use client';

import { useMemo, useState } from 'react';
import styles from './day001.module.css';
import review from './day001-review.module.css';

type Scene = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
};

const SCENES: Scene[] = [
  { key: 'void', eyebrow: 'ORIGEM', title: 'Antes da forma.', body: 'A experiência começa quase vazia. Uma única possibilidade permanece no centro.' },
  { key: 'touch', eyebrow: 'PRIMEIRA RESPOSTA', title: 'A luz respondeu.', body: 'O sistema reconhece o gesto antes de revelar informação.' },
  { key: 'geometry', eyebrow: 'GEOMETRIA', title: 'A forma nasce do vazio.', body: 'Ponto, eixo, anel, nó e threshold estruturam Kether sem criar um sigilo novo.' },
  { key: 'crown', eyebrow: 'DIA 001 · KETHER', title: 'A Coroa', body: 'Atziluth · Vehuiah · Neófito · +150 XP · TEURG-101 · COMP-101 · BIO-101.' },
  { key: 'leap', eyebrow: 'O LOUCO · FEHU · HEXAGRAMA 1', title: 'O Salto Cósmico', body: 'O primeiro movimento do Dia 001 aparece como passagem, não como lição ou dashboard.' },
  { key: 'crossing', eyebrow: 'TRAVESSIA', title: 'Cruzar é uma decisão.', body: 'No runtime autenticado, este movimento cria a sessão canônica de prática.' },
  { key: 'chamber', eyebrow: 'CÂMARA DE KETHER', title: 'Silêncio antes do conteúdo.', body: 'A interface reduz novamente sua presença. Áudio permanece PRESET_PENDING.' },
  { key: 'reveal', eyebrow: 'REVELAÇÃO', title: 'A tríade emerge.', body: 'Expansão, fricção e convergência aparecem como mudanças de campo, nunca três cards mecânicos.' },
  { key: 'manuscript', eyebrow: 'MANUSCRITO', title: 'O texto volta a respirar.', body: 'A produção web deve carregar o Markdown canônico sincronizado; este proof não duplica o texto editorial dentro da camada visual.' },
  { key: 'relic', eyebrow: 'RELIC MOMENT', title: 'A origem torna-se tocável.', body: 'Um artefato memorável feito apenas de primitivas aprovadas: ponto, eixo, anéis e limiar.' },
  { key: 'kavanah', eyebrow: 'KAVANAH', title: 'Prática guiada.', body: 'O runtime final recebe os três movimentos canônicos e registra duração sem premiar intensidade subjetiva.' },
  { key: 'intention', eyebrow: 'INTENÇÃO PESSOAL', title: 'Nomeie o que você traz.', body: 'Registro privado do praticante; nunca substitui conteúdo canônico.' },
  { key: 'contract', eyebrow: 'CONTRATO DO NEÓFITO', title: 'Prática voluntária. Retorno preservado.', body: 'Pausar, encerrar ou retornar continua permitido. Desconforto não é falha.' },
  { key: 'seal', eyebrow: 'SELO', title: 'A intenção recebe um limite.', body: 'Geometria de threshold/origem. Não é o sigilo canônico de Kether.' },
  { key: 'mirror', eyebrow: 'ESPELHO DA ALMA', title: 'O que mudou?', body: 'No runtime real, conteúdo sensível é cifrado antes do sync.' },
  { key: 'quest', eyebrow: 'QUEST · ASSIAH', title: 'Leve a travessia ao mundo.', body: 'Três distrações deixam o centro; a ação concreta nasce da prática.' },
  { key: 'reward', eyebrow: 'RECOMPENSA', title: '+150 XP', body: 'Somente uma conclusão canônica idempotente concede XP.' },
  { key: 'tree', eyebrow: 'ÁRVORE DA VIDA', title: 'Kether acende.', body: '1 de 36 travessias registrada. Ainda não existe Fragmento I de Vehuiah.' },
  { key: 'passage', eyebrow: 'PASSAGEM', title: 'Neófito — travessia iniciada.', body: 'O usuário retorna ao sistema diferente de como entrou.' },
  { key: 'atrium', eyebrow: 'O ÁTRIO · TRANSFORMADO', title: 'Agora existe uma luz.', body: 'A primeira centelha permanece como memória espacial do progresso.' },
];

export function Day001WebExperience() {
  const [index, setIndex] = useState(0);
  const [intention, setIntention] = useState('');
  const [mirror, setMirror] = useState('');
  const [contract, setContract] = useState(false);
  const scene = SCENES[index];
  const progress = `${String(index + 1).padStart(2, '0')} / ${SCENES.length}`;

  const geometryLevel = useMemo(() => Math.min(index, 12), [index]);
  const canAdvance =
    scene.key === 'intention' ? intention.trim().length > 0 :
    scene.key === 'contract' ? contract :
    scene.key === 'mirror' ? mirror.trim().length > 0 : true;
  const reviewSceneClass = scene.key === 'relic'
    ? review.relicScene
    : scene.key === 'atrium'
      ? review.atriumScene
      : '';
  const reduceOrigin = scene.key === 'relic' || scene.key === 'atrium';

  function next() {
    setIndex((value) => Math.min(SCENES.length - 1, value + 1));
  }

  return (
    <main className={`${styles.shell} ${review.shellReview}`} data-hnk-theme="kether" data-scene={scene.key}>
      {index >= 3 ? (
        <header className={styles.hud}>
          <div>
            <span>HNK CODEX · DIA 001</span>
            <strong>KETHER</strong>
          </div>
          <div className={styles.hudRight}>
            <span>{progress}</span>
            <small>WEB PROOF · LOCAL STATE</small>
          </div>
        </header>
      ) : null}

      <section className={`${styles.origin} ${reduceOrigin ? review.originReduced : ''}`} aria-label="Geometria progressiva de Kether">
        {geometryLevel >= 2 ? <i className={styles.axis} /> : null}
        {geometryLevel >= 1 ? <i className={`${styles.ring} ${styles.ringOne}`} /> : null}
        {geometryLevel >= 3 ? <i className={`${styles.ring} ${styles.ringTwo}`} /> : null}
        {geometryLevel >= 5 ? <i className={styles.threshold} /> : null}
        {geometryLevel >= 9 ? <i className={styles.rays} /> : null}
        <i className={`${styles.point} ${geometryLevel > 0 ? styles.pointActive : ''}`} />
      </section>

      <section className={`${styles.scene} ${index < 2 ? styles.sceneBare : ''} ${reviewSceneClass}`}>
        <p className={styles.eyebrow}>{scene.eyebrow}</p>
        <h1>{scene.title}</h1>
        <p className={styles.body}>{scene.body}</p>

        {scene.key === 'crown' ? (
          <div className={styles.constellation}>
            <span><small>MUNDO</small>ATZILUTH</span>
            <span><small>ANJO</small>VEHUIAH</span>
            <span><small>GRAU</small>NEÓFITO</span>
            <span><small>XP</small>+150</span>
          </div>
        ) : null}

        {scene.key === 'relic' ? (
          <div className={`${styles.relic} ${review.relicStage}`} aria-label="Relic Moment de Kether">
            <i className={styles.relicAxis} />
            <i className={`${styles.relicRing} ${styles.relicOuter}`} />
            <i className={`${styles.relicRing} ${styles.relicInner}`} />
            <i className={styles.relicRays} />
            <i className={styles.relicPoint} />
          </div>
        ) : null}

        {scene.key === 'intention' ? (
          <textarea value={intention} onChange={(event) => setIntention(event.target.value)} placeholder="MINHA INTENÇÃO PARA ESTA TRAVESSIA…" className={styles.input} />
        ) : null}

        {scene.key === 'contract' ? (
          <button type="button" className={`${styles.contract} ${contract ? styles.contractActive : ''}`} onClick={() => setContract((value) => !value)} aria-pressed={contract}>
            <i /> {contract ? 'CONTRATO CONFIRMADO' : 'TOCAR PARA CONFIRMAR'}
          </button>
        ) : null}

        {scene.key === 'seal' ? (
          <div className={styles.seal} aria-label="Geometria de selo não canônica">
            <i className={styles.sealSquare} />
            <i className={styles.sealCircle} />
            <i className={styles.sealPoint} />
          </div>
        ) : null}

        {scene.key === 'mirror' ? (
          <textarea value={mirror} onChange={(event) => setMirror(event.target.value)} placeholder="ESCREVA SEM PRESSA…" className={`${styles.input} ${styles.mirror}`} />
        ) : null}

        {scene.key === 'tree' || scene.key === 'atrium' ? (
          <div className={`${styles.tree} ${scene.key === 'atrium' ? review.treeStage : ''}`} aria-label="Kether aceso na Árvore da Vida">
            <i className={styles.treeStem} />
            <i className={`${review.treeBranch} ${review.treeBranchLeft}`} />
            <i className={`${review.treeBranch} ${review.treeBranchRight}`} />
            <i className={`${styles.treeNode} ${styles.kether}`}><b /></i>
            <i className={`${styles.treeNode} ${styles.chokmah}`} />
            <i className={`${styles.treeNode} ${styles.binah}`} />
            <i className={`${styles.treeNode} ${styles.tiphereth}`} />
            <i className={`${styles.treeNode} ${styles.yesod}`} />
            <i className={`${styles.treeNode} ${styles.malkuth}`} />
          </div>
        ) : null}

        {scene.key !== 'atrium' ? (
          <button type="button" className={styles.cta} onClick={next} disabled={!canAdvance}>
            {scene.key === 'void' ? 'TOCAR A ORIGEM' : scene.key === 'tree' ? 'PASSAR ADIANTE' : 'CONTINUAR'}
          </button>
        ) : (
          <div className={styles.finalState}>KETHER · 001 / 036 · VEHUIAH 1 / 5 · NEÓFITO</div>
        )}
      </section>

      {index >= 3 ? (
        <footer className={styles.footer}>
          <span>VISUAL PASS V2</span>
          <span>REDUCED MOTION READY</span>
          <span>CANON COPY NOT DUPLICATED</span>
        </footer>
      ) : null}
    </main>
  );
}
