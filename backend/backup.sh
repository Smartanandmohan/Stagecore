#!/bin/bash
# Backup script for StageCore PostgreSQL Database

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

DB_USER=${DB_USER:-postgres}
DB_NAME=${DB_NAME:-esports_db}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
BACKUP_DIR="./backups"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/stagecore_$DATE.sql"

mkdir -p $BACKUP_DIR

echo "Starting database backup for $DB_NAME..."
pg_dump -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME > $BACKUP_FILE

if [ $? -eq 0 ]; then
  echo "Backup successfully created at $BACKUP_FILE"
  # Optional: Keep only last 7 backups
  find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;
  echo "Old backups cleaned up."
else
  echo "Backup failed!"
  exit 1
fi
