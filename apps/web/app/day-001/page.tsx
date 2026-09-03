import type { Metadata } from 'next';
import { Day001ImmersiveExperience } from './Day001ImmersiveExperience';
import { WebAtriumBoundary, WebDay001RuntimeProvider } from './WebDay001Runtime';

export const metadata: Metadata = {
  title: 'Dia 001 · Kether · HNK Codex',
  description: 'Experiência educacional-iniciática imersiva do Dia 001 de Kether no HNK Codex Digital.',
};

export default function Day001Page() {
  return (
    <WebDay001RuntimeProvider>
      <WebAtriumBoundary>
        <Day001ImmersiveExperience />
      </WebAtriumBoundary>
    </WebDay001RuntimeProvider>
  );
}
