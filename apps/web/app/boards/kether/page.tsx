import { ketherChapterOverview } from '@hnk/assets';
import styles from './board.module.css';

export default function KetherBoardPage() {
  const board = ketherChapterOverview;

  return (
    <main className={styles.page}>
      <section className={styles.board} aria-label={board.accessibility.alt}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>HNK · {board.family.toUpperCase()}</p>
            <h1>{board.title}</h1>
            <p className={styles.subtitle}>{board.subtitle}</p>
          </div>
          <div className={styles.crown} aria-hidden="true">
            <span />
          </div>
        </header>

        <div className={styles.factGrid}>
          {board.facts.map((fact) => (
            <article className={styles.fact} key={`${fact.label}-${fact.value}`}>
              <p>{fact.label}</p>
              <strong>{fact.value}</strong>
            </article>
          ))}
        </div>

        <div className={styles.sectionGrid}>
          {board.sections.map((section) => (
            <article className={styles.panel} key={section.id}>
              {section.eyebrow ? <p className={styles.panelEyebrow}>{section.eyebrow}</p> : null}
              <h2>{section.title}</h2>
              {section.body ? <p className={styles.body}>{section.body}</p> : null}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.facts ? (
                <dl className={styles.inlineFacts}>
                  {section.facts.map((fact) => (
                    <div key={`${section.id}-${fact.label}`}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </article>
          ))}
        </div>

        {board.cycles ? (
          <section className={styles.cycles} aria-labelledby="cycles-title">
            <div className={styles.sectionHeading}>
              <p className={styles.panelEyebrow}>Progressão</p>
              <h2 id="cycles-title">Sete ciclos de Kether</h2>
            </div>
            <div className={styles.cycleGrid}>
              {board.cycles.map((cycle) => (
                <article className={styles.cycle} key={cycle.id}>
                  <div className={styles.cycleNumber}>{String(cycle.index).padStart(2, '0')}</div>
                  <div>
                    <p className={styles.cycleMeta}>
                      {cycle.label} · Dias {cycle.days[0]}–{cycle.days[1]}
                    </p>
                    <h3>{cycle.title}</h3>
                    {cycle.focus ? <p>{cycle.focus}</p> : null}
                    {cycle.attributes?.length ? (
                      <p className={styles.attributes}>{cycle.attributes.join(' · ')}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {board.portal ? (
          <section className={styles.portal}>
            <div className={styles.portalMark} aria-hidden="true" />
            <div>
              <p className={styles.panelEyebrow}>Portal · Dia {board.portal.days.join(', ')}</p>
              <h2>{board.portal.title}</h2>
              {board.portal.summary ? <p>{board.portal.summary}</p> : null}
            </div>
          </section>
        ) : null}

        <footer className={styles.footer}>
          <span>{board.id}</span>
          <span>v{board.version}</span>
          <span>{board.lifecycle}</span>
        </footer>
      </section>
    </main>
  );
}
