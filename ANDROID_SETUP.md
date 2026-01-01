# StudySync Android App - Capacitor Setup Guide

## ✅ Conversion Complete!

Your React + Vite app has been successfully converted to an Android app using Capacitor!

## What Was Set Up

### 1. **Capacitor Integration**
- ✅ Capacitor CLI and Core installed
- ✅ Android platform added
- ✅ Capacitor config with Android settings
- ✅ Essential plugins installed:
  - `@capacitor/app` - App lifecycle and back button handling
  - `@capacitor/keyboard` - Keyboard management
  - `@capacitor/splash-screen` - Splash screen
  - `@capacitor/status-bar` - Status bar styling

### 2. **Mobile Optimizations**
- ✅ Mobile initialization handler in `capacitorInit.js`
- ✅ Updated `main.jsx` to initialize Capacitor
- ✅ Enhanced `index.html` with mobile meta tags
- ✅ Viewport fit cover for notch support
- ✅ App theme color and status bar styling

### 3. **Build Scripts Added**
```bash
npm run build:android      # Build web + prepare Android
npm run sync:android       # Sync web assets to Android
npm run open:android       # Open Android project in Android Studio
```

## Prerequisites for Building

### Required Software
1. **Java Development Kit (JDK) 11 or higher**
   ```bash
   # Download from: https://www.oracle.com/java/technologies/downloads/
   # Or use OpenJDK from Microsoft
   ```

2. **Android SDK**
   ```bash
   # Install via Android Studio: https://developer.android.com/studio
   # During setup, ensure these are installed:
   # - Android SDK Platform (API 31+)
   # - Android SDK Build-Tools
   # - Android Emulator
   # - Android SDK Platform-Tools
   ```

3. **Environment Variables** (Windows)
   ```
   Set JAVA_HOME=C:\Program Files\Java\jdk-11 (or your JDK path)
   Set ANDROID_SDK_ROOT=C:\Users\YourUsername\AppData\Local\Android\Sdk
   
   Add to PATH:
   %JAVA_HOME%\bin
   %ANDROID_SDK_ROOT%\tools
   %ANDROID_SDK_ROOT%\tools\bin
   %ANDROID_SDK_ROOT%\platform-tools
   ```

4. **Gradle** (Usually installed with Android Studio)

## Build & Deploy Steps

### Step 1: Verify Setup
```bash
# Check if Android SDK is found
%ANDROID_SDK_ROOT%\tools\bin\sdkmanager --list
```

### Step 2: Build the Android App
```bash
cd "c:\Users\progr\OneDrive\Documents\Project\Frontend"
npm run build:android
```

### Step 3: Open in Android Studio
```bash
npm run open:android
```

### Step 4: Build APK/AAB in Android Studio
1. Open Android Studio
2. Project should auto-load from `./android` folder
3. Go to **Build** → **Generate Signed Bundle/APK**
4. Follow the wizard to generate:
   - **Debug APK** - for testing
   - **Release APK** - for distribution
   - **AAB** - for Google Play Store

### Step 5: Run on Emulator or Device
```bash
# Build and run directly
cd android
./gradlew assembleDebug

# Or use Android Studio to run on emulator/device
```

## Project Structure

```
Frontend/
├── src/
│   ├── main.jsx              (Updated with Capacitor init)
│   ├── utilities/
│   │   └── capacitorInit.js  (Mobile initialization)
│   └── ... (existing React files)
├── android/                  (NEW - Android project)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── assets/
│   │   │       └── capacitor.json
│   │   └── build.gradle
│   └── build.gradle
├── dist/                     (Built web files)
├── capacitor.config.ts       (Capacitor configuration)
├── package.json              (Updated with build scripts)
└── index.html                (Updated with mobile meta tags)
```

## Development Workflow

### Development Mode
```bash
# Terminal 1: Run dev server (web preview)
npm run dev

# Terminal 2: Watch for changes and sync to Android
npm run sync:android
```

### Production Mode
```bash
# Build and prepare for Android
npm run build:android

# Open in Android Studio
npm run open:android

# Build APK in Android Studio
```

## Important Notes

### API Configuration
- The app is configured to allow mixed content (HTTP/HTTPS)
- Your backend API at `https://study-sync-mv99.onrender.com` is already configured
- Ensure CORS headers are properly set on your backend

### Permissions
The following permissions are automatically included:
- INTERNET - For API calls
- ACCESS_NETWORK_STATE - For network detection
- WRITE_EXTERNAL_STORAGE - If needed for caching
- READ_EXTERNAL_STORAGE - If needed for file access

### Debugging
```bash
# Enable web debugging in Chrome DevTools
# Connect device via USB with debugging enabled
# Chrome DevTools will auto-detect the app
```

### Testing
1. **On Emulator** - Best for quick testing
2. **On Physical Device** - USB debugging enabled
   ```bash
   # Enable Developer Options: Tap Build Number 7 times in Settings
   # Enable USB Debugging
   # Connect via USB
   ```

## Troubleshooting

### Issue: Java not found
**Solution:**
```bash
# Set JAVA_HOME
set JAVA_HOME=C:\path\to\jdk
# Verify
echo %JAVA_HOME%
```

### Issue: Android SDK not found
**Solution:**
```bash
# Set ANDROID_SDK_ROOT
set ANDROID_SDK_ROOT=C:\Users\YourUsername\AppData\Local\Android\Sdk
# Verify
echo %ANDROID_SDK_ROOT%
```

### Issue: Gradle sync fails
**Solution:**
1. Close Android Studio
2. Delete `android/.gradle` folder
3. Reopen Android Studio

### Issue: App crashes on launch
**Solution:**
1. Check logcat in Android Studio
2. Enable web debugging
3. Check capacitor.config.ts for correct URLs

## Next Steps

1. ✅ **Review** - Check the `android/` folder structure
2. ✅ **Test** - Run on emulator first
3. ✅ **Configure** - Update app name, icons, and splash screen
4. ✅ **Build** - Generate APK for testing
5. ✅ **Deploy** - Publish to Google Play Store (requires signing key)

## Useful Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Studio Setup](https://developer.android.com/studio)
- [Gradle Documentation](https://gradle.org/releases)
- [Building for Android](https://capacitorjs.com/docs/android)

## Questions or Issues?

For more help with Capacitor and Android development, visit:
- https://capacitorjs.com/docs
- https://stackoverflow.com/questions/tagged/capacitor
- https://github.com/ionic-team/capacitor

---

**App Details:**
- App ID: `com.studysync.app`
- App Name: `StudySync`
- Web Directory: `dist/`
- Min API Level: 21 (Android 5.0)
- Target API: Latest
