#!/bin/bash
# StudySync Android - Quick Build Script

echo "================================"
echo "StudySync Android App Builder"
echo "================================"
echo ""

# Set working directory
cd "c:\Users\progr\OneDrive\Documents\Project\Frontend"

echo "Step 1: Cleaning and building web bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Web build failed"
    exit 1
fi

echo ""
echo "Step 2: Preparing Android..."
npm run build:android

if [ $? -ne 0 ]; then
    echo "❌ Android build prep failed"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "Next steps:"
echo "1. Run: npm run open:android"
echo "2. In Android Studio: Build > Generate Signed Bundle/APK"
echo "3. Wait for build to complete"
echo "4. Your APK is ready at: android/app/build/outputs/apk/release/"
echo ""
echo "Or for development:"
echo "- Terminal 1: npm run dev"
echo "- Terminal 2: npm run sync:android"
echo "- Then run on device in Android Studio"
echo ""
