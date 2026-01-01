import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

export const initializeCapacitor = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      // Hide splash screen
      await SplashScreen.hide().catch(() => {
        // Splash screen might not be available on all platforms
      });

      // Configure status bar
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#fafaf9' }); // Light background
      }

      // Handle back button on Android
      App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          App.exitApp();
        }
      });

      // Hide keyboard on scroll
      Keyboard.addListener('keyboardWillShow', () => {
        document.body.classList.add('keyboard-open');
      });

      Keyboard.addListener('keyboardWillHide', () => {
        document.body.classList.remove('keyboard-open');
      });

      console.log('Capacitor initialized for', Capacitor.getPlatform());
    }
  } catch (error) {
    console.error('Error initializing Capacitor:', error);
  }
};
