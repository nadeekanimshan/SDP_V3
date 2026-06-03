@echo off
echo ================================
echo Event URL Field Setup
echo ================================
echo.

echo Step 1: Generating Prisma Client...
call npm run db:generate

if %errorlevel% neq 0 (
    echo Failed to generate Prisma client
    pause
    exit /b 1
)

echo Prisma client generated successfully
echo.

echo Step 2: Pushing schema to database...
call npm run db:push

if %errorlevel% neq 0 (
    echo Failed to push schema to database
    echo Please check your DATABASE_URL in .env file
    pause
    exit /b 1
)

echo Database schema updated successfully
echo.

echo ================================
echo Setup complete!
echo ================================
echo.
echo The eventUrl field has been added to the Event table.
echo Please restart your backend server:
echo   npm run dev
echo.
pause
