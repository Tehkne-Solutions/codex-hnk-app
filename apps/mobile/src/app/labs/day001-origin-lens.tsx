import { Redirect, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { KetherOriginRelicNative } from '../../features/kether/KetherOriginRelicNative';

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default function Day001OriginLensProofScreen() {
  const params = useLocalSearchParams<{ layer?: string | string[]; motion?: string | string[] }>();
  const enabled = process.env.EXPO_PUBLIC_HNK_NATIVE_VISUAL_PROOF === '1';

  if (!enabled) return <Redirect href="/" />;

  const layerParam = first(params.layer);
  const motionParam = first(params.motion);
  const initialLayer: 0 | 1 | 2 = layerParam === '2' ? 1 : layerParam === '3' ? 2 : 0;
  const reduceMotion = motionParam === 'reduce';

  return (
    <View style={styles.screen}>
      <KetherOriginRelicNative reduceMotion={reduceMotion} initialOpen initialLayer={initialLayer} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020202',
  },
});
