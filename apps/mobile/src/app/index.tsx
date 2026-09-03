import { AtriumGate } from '../features/auth/AtriumGate';
import { KetherCycle01 } from '../features/kether/KetherCycle01';

export default function HomeScreen() {
  return (
    <AtriumGate>
      <KetherCycle01 />
    </AtriumGate>
  );
}
