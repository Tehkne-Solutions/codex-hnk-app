import type { Metadata } from 'next';
import { Day001ImmersiveExperience } from './Day001ImmersiveExperience';
import { WebAtriumBoundary, WebDay001RuntimeProvider } from './WebDay001Runtime';
import artStyles from './day001-art-pass-v2.module.css';

export const metadata: Metadata = {
  title: 'Dia 001 · Kether · HNK Codex',
  description: 'Experiência educacional-iniciática imersiva do Dia 001 de Kether no HNK Codex Digital.',
};

export default function Day001Page() {
  return (
    <div className={artStyles.artPass}>
      <WebDay001RuntimeProvider>
        <WebAtriumBoundary>
          <Day001ImmersiveExperience />
        </WebAtriumBoundary>
      </WebDay001RuntimeProvider>
    </div>
  );
}
