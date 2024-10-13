import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  cordova: {},
  appId: 'io.ionic.starter',
  appName: 'Teste2_Projeto',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '989223096163-gs2d6t886kj97bju6a4n4hrocbri1su8.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;

