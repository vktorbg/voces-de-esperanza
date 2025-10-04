import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vocesdeesperanza.app',
  appName: 'VocesDeEsperanza',
  webDir: 'public',
  plugins: {
    StatusBar: {
      style: 'LIGHT',
      overlaysWebView: true,
      backgroundColor: '#1a202c'
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
