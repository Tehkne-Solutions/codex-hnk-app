import type { Metadata } from 'next';
import { Day001WebExperience } from './Day001WebExperience';
import { WebAtriumBoundary, WebDay001RuntimeProvider } from './WebDay001Runtime';

export const metadata: Metadata = {
  title: 'Dia 001 · Kether · HNK Codex',
  description: 'Master vertical slice do Dia 001 de Kether no HNK Codex Digital.',
};

export default function Day001Page() {
  return (
    <WebDay001RuntimeProvider>
      <WebAtriumBoundary>
        <Day001WebExperience />
      </WebAtriumBoundary>
    </WebDay001RuntimeProvider>
  );
}
