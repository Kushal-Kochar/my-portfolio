@echo off
echo Installing dependencies...
npm install

echo Building the project...
npm run build

echo Deploying to GitHub Pages...
npm run deploy

echo.
echo Deployment complete! Your AI Chat Assistant will be available at:
echo https://kushal-kochar.github.io/ai-chat-assistant
echo.
pause
