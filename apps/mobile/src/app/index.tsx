import { AtriumGate } from '../features/auth/AtriumGate';
import { Day001VerticalSlice } from '../features/kether/Day001VerticalSlice';

export default function HomeScreen() {
  return (
    <AtriumGate>
      <Day001VerticalSlice />
    </AtriumGate>
  );
}
