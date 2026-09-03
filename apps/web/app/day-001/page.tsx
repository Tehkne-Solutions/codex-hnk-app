import type { Metadata } from 'next';
import { Day001WebExperience } from './Day001WebExperience';

export const metadata: Metadata = {
  title: 'Dia 001 · Kether · HNK Codex',
  description: 'Master vertical slice do Dia 001 de Kether no HNK Codex Digital.',
};

export default function Day001Page() {
  return <Day001WebExperience />;
}
