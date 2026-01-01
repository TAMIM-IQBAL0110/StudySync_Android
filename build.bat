@echo off
REM StudySync Android - Build Script for Windows

echo ================================
echo StudySync Android App Builder
echo ================================
echo.

REM Set working directory
cd /d "c:\Users\progr\OneDrive\Documents\Project\Frontend"

echo Step 1: Cleaning and building web bundle...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed: Web build failed
    pause
    exit /b 1
)

echo.
echo Step 2: Preparing Android...
call npm run build:android

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed: Android build prep failed
    pause
    exit /b 1
)

echo.
echo ===================================
echo SUCCESS! Build completed!
echo ===================================
echo.
echo Next steps:
echo 1. Run: npm run open:android
echo 2. In Android Studio:
echo    - Build Menu
echo    - Generate Signed Bundle/APK
echo    - Wait for completion
echo 3. Your APK is ready!
echo.
echo APK Location:
echo android\app\build\outputs\apk\release\
echo.
echo For Development:
echo - Terminal 1: npm run dev
echo - Terminal 2: npm run sync:android
echo - Then run on device in Android Studio
echo.
pause
