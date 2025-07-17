
@echo off
echo Starting AI Dashboard locally...
echo.
echo Installing dependencies...
cd server
call npm install
echo.
echo Starting development server...
call npm run dev
pause
