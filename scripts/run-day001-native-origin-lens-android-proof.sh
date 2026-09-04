#!/usr/bin/env sh
set -eu

artifact_dir='artifacts/day001-native-origin-lens-android'
apk_path='apps/mobile/android/app/build/outputs/apk/release/app-release.apk'
package='com.tehknesolutions.codexhnk'

mkdir -p "$artifact_dir"

pnpm --filter @hnk/mobile exec expo prebuild --platform android --clean --no-install
(
  cd apps/mobile/android
  ./gradlew app:assembleRelease -PreactNativeArchitectures=x86_64
)

test -f "$apk_path"
adb install -r "$apk_path" >/dev/null

capture_layer() {
  layer="$1"
  suffix="$2"
  query="layer=${layer}"
  if [ "$suffix" = 'reduced' ]; then
    query="${query}&motion=reduce"
  fi

  xml="$artifact_dir/layer-${layer}-${suffix}.xml"
  png="$artifact_dir/layer-${layer}-${suffix}.png"

  adb shell am force-stop "$package"
  adb shell am start -W -a android.intent.action.VIEW -d "hnk:///labs/day001-origin-lens?${query}" -p "$package" >/dev/null

  success=0
  attempt=1
  while [ "$attempt" -le 60 ]; do
    adb shell uiautomator dump /sdcard/hnk-origin-lens.xml >/dev/null 2>&1 || true
    adb pull /sdcard/hnk-origin-lens.xml "$xml" >/dev/null 2>&1 || true
    if [ -f "$xml" ] && grep -q "Camada ${layer} de 3" "$xml" && grep -q 'LENTE DA ORIGEM' "$xml"; then
      success=1
      break
    fi
    attempt=$((attempt + 1))
    sleep 2
  done

  if [ "$success" -ne 1 ]; then
    echo "Origin Lens layer ${layer} (${suffix}) did not become accessible in Android runtime."
    if [ -f "$xml" ]; then
      cat "$xml"
    fi
    exit 1
  fi

  sleep 1
  adb exec-out screencap -p > "$png"
  test -s "$png"
  grep -q 'HNK · INSTRUMENTO DE INTERFACE' "$xml"
  grep -q 'Fechar Lente da Origem' "$xml"
}

verify_ep_boundary() {
  xml="$artifact_dir/hnk-ep-boundary.xml"
  found=0
  attempt=1

  while [ "$attempt" -le 8 ]; do
    adb shell input swipe 540 2050 540 500 500 >/dev/null 2>&1 || true
    sleep 1
    adb shell uiautomator dump /sdcard/hnk-origin-lens-ep.xml >/dev/null 2>&1 || true
    adb pull /sdcard/hnk-origin-lens-ep.xml "$xml" >/dev/null 2>&1 || true
    if [ -f "$xml" ] && grep -q 'FRONTEIRA HNK-EP' "$xml"; then
      found=1
      break
    fi
    attempt=$((attempt + 1))
  done

  if [ "$found" -ne 1 ]; then
    echo 'Origin Lens HNK-EP boundary did not become accessible after scrolling.'
    if [ -f "$xml" ]; then
      cat "$xml"
    fi
    exit 1
  fi
}

capture_layer 1 motion
capture_layer 2 motion
capture_layer 3 motion
capture_layer 3 reduced
verify_ep_boundary

android_release="$(adb shell getprop ro.build.version.release | tr -d '\r')"
android_sdk="$(adb shell getprop ro.build.version.sdk | tr -d '\r')"
model="$(adb shell getprop ro.product.model | tr -d '\r')"

cat > "$artifact_dir/proof.txt" <<EOF
HNK Day 001 Native Origin Lens Android Visual Proof V1
platform=android
runtime=emulator
model=${model}
android_release=${android_release}
android_sdk=${android_sdk}
abi=x86_64
renderer=react-native-android-release
route=/labs/day001-origin-lens
proof_mode_env=EXPO_PUBLIC_HNK_NATIVE_VISUAL_PROOF
layers=1,2,3
reduced_motion_layer=3
safe_area=react-native-safe-area-context
hnk_ep_boundary=PASS_AFTER_SCROLL
canonical_sigilo=NO
ritual_audio=NONE
persistent_user_data=NONE
visual_approval=REQUIRES_HUMAN_SCREENSHOT_REVIEW
EOF

sha256sum "$artifact_dir"/*.png "$artifact_dir"/*.xml "$artifact_dir/proof.txt" > "$artifact_dir/SHA256SUMS"
cat "$artifact_dir/proof.txt"
cat "$artifact_dir/SHA256SUMS"
