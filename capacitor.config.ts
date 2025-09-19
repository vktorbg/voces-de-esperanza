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
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
    }
  }
};

export default config;
