import * as Font from 'expo-font';

export async function loadFonts() {
  await Font.loadAsync({
    'logo-font': require('./assets/fonts/chab.ttf'),

    // 'your-font-bold': require('../assets/fonts/YourFont-Bold.ttf'),
  });
}