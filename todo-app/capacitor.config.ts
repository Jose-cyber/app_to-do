import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.todo-app', 
  appName: 'todo-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
