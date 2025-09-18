import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vocesdeesperanza.app',
  appName: 'VocesDeEsperanza',
  webDir: 'public',
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#f3f4f6',
      overlaysWebView: true
    }
  }
};

export default config;
