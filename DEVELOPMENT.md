# 🔄 Development Workflow

## Development vs Production

### 🛠️ Development Mode (with live reload)

Perfect for active development:

```bash
# Terminal 1: Start web dev server (runs on http://localhost:5173)
npm run dev

# Terminal 2: Watch and sync changes to Android
npm run sync:android

# Terminal 3 (Optional): Open in Android Studio when ready
npm run open:android
```

**Benefits:**
- Fast hot reload
- See changes instantly in browser
- Can debug via Chrome DevTools
- Quick iteration

### 📦 Production Mode (for testing/release)

For building release APKs:

```bash
# Build optimized web bundle
npm run build:android

# Open in Android Studio
npm run open:android

# In Android Studio: Build > Generate Signed Bundle/APK
```

## Step-by-Step Development Guide

### First Time: Initial Setup

1. **Ensure prerequisites are installed:**
   ```bash
   # Check Java
   java -version
   
   # Check Android SDK
   %ANDROID_SDK_ROOT%\tools\bin\sdkmanager --list
   ```

2. **Build the app:**
   ```bash
   npm run build:android
   ```

3. **Open in Android Studio:**
   ```bash
   npm run open:android
   ```

4. **Let Gradle sync complete** (first time takes 2-5 minutes)

5. **Run on emulator/device:**
   - Click ▶️ Run button in Android Studio
   - Select target device

### Regular Development: Make Changes & Sync

```bash
# 1. Make changes in src/ files
# (Edit any React component, add features, etc.)

# 2. Rebuild and sync
npm run build:android

# 3. See changes
# Either:
# - Refresh browser if testing web version
# - Rebuild and redeploy to device in Android Studio
# - Or use live reload setup (see below)
```

### Advanced: Live Reload During Development

For fastest development with live reload:

**Setup (one-time):**

1. **Get your machine's IP address:**
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.5)
   ```

2. **Update `capacitor.config.ts`:**
   ```typescript
   server: {
     url: 'http://192.168.1.5:5173',  // Your machine IP
     cleartext: true
   }
   ```

3. **Rebuild:**
   ```bash
   npm run build:android
   npm run sync:android
   npm run open:android
   ```

4. **Run dev server & on device:**
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   npm run open:android
   # Then run on device in Android Studio
   ```

**Now:** Changes auto-reload on your device! 🎉

### Building for Release

1. **Build production bundle:**
   ```bash
   npm run build:android
   ```

2. **Open Android Studio:**
   ```bash
   npm run open:android
   ```

3. **Create signing key (first time only):**
   - In Android Studio: Build > Generate Signed Bundle/APK
   - Create new key or use existing
   - **SAVE THE KEY SAFELY** - You need it for Play Store updates

4. **Build signed APK:**
   - Build > Generate Signed Bundle/APK
   - Select "APK"
   - Choose release configuration
   - Select your signing key
   - Build completes

5. **Find your APK:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

6. **Test on device:**
   - Connect via USB
   - `./gradlew installRelease`
   - Or drag APK to emulator

## Debugging

### Browser Debugging (Web Version)

```bash
npm run dev
# Open http://localhost:5173 in browser
# Press F12 for DevTools
```

### Android Device Debugging

1. **Enable on device:**
   - Settings > About Phone > tap Build Number 7 times
   - Settings > Developer Options > USB Debugging ON
   - Connect via USB

2. **In Android Studio:**
   - Window > Toggle Logcat
   - See real-time logs
   - Can set breakpoints

3. **Chrome DevTools (Remote):**
   - Chrome > chrome://inspect
   - Enable port forwarding
   - See device logs in DevTools

### Logcat Debugging

```bash
# Get all logs
adb logcat

# Filter by app
adb logcat | findstr "StudySync"

# Clear and watch
adb logcat -c
adb logcat -s "StudySync"
```

## Common Tasks

### Change App Icon

```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png
├── mipmap-mdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
└── ... (other densities)
```

Replace these with your icons (192x192 minimum)

### Change App Name

Edit `android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:label="@string/app_name"
    ...>
```

Or in `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">StudySync</string>
```

### Change Splash Screen

Edit `capacitor.config.ts`:
```typescript
plugins: {
  SplashScreen: {
    launchShowDuration: 2000,
    backgroundColor: '#FFFFFF'
  }
}
```

### Update API Endpoint

Edit `.env` or `src/utilities/apiPath.js`:
```javascript
VITE_BASE_URL=https://your-api.com
```

Then rebuild:
```bash
npm run build:android
```

## Performance Tips

1. **Use production builds for testing**
   - Debug builds are larger and slower
   - Always test release APK before publishing

2. **Optimize images**
   - Use compressed PNGs/WebPs
   - Reduce bundle size

3. **Monitor bundle size:**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

4. **Enable code splitting:**
   Already configured in Vite

## Troubleshooting Development

### Issue: Sync fails

```bash
# Clean and resync
rm -r android/app/src/main/assets
npm run build:android
```

### Issue: Port 5173 in use

```bash
# Use different port
npm run dev -- --port 3000
```

### Issue: Changes not showing

```bash
# Full rebuild
npm run build:android
npm run sync:android
# Rebuild in Android Studio
```

### Issue: Gradle won't sync

```bash
# Clear gradle cache
rm -r android/.gradle
# Reopen Android Studio
```

## Performance Checklist

Before release:
- ✅ Build with `npm run build:android`
- ✅ Test on real device (not just emulator)
- ✅ Check all API calls work
- ✅ Verify images/assets load
- ✅ Test back button behavior
- ✅ Check keyboard behavior on forms
- ✅ Monitor battery usage
- ✅ Verify offline behavior (if applicable)

---

**Ready to develop?** Run:
```bash
npm run build:android && npm run open:android
```

Happy coding! 🚀
