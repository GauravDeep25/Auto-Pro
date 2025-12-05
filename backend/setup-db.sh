#!/bin/bash

echo "🔧 Checking MongoDB Atlas connection..."

# Check if MONGO_URI contains Atlas connection
MONGO_URI=$(grep MONGO_URI .env 2>/dev/null | cut -d '=' -f2)

if [[ -z "$MONGO_URI" ]] || [[ "$MONGO_URI" == *"localhost"* ]]; then
    echo "⚠️  MongoDB Atlas not configured!"
    echo ""
    echo "Please update MONGO_URI in backend/.env with your Atlas connection string"
    echo "Example: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/autopro"
    echo ""
    exit 1
fi

echo "✅ MongoDB Atlas configured"
echo "🌱 Seeding database..."

node seeder.js

if [ $? -eq 0 ]; then
    echo "✅ Database ready!"
else
    echo "⚠️  Seeding failed. Server will start anyway."
    echo "💡 Check MongoDB Atlas IP whitelist and connection."
fi
