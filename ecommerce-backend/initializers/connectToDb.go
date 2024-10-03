package initializers

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb() {
	dsn := os.Getenv("DB")
	if dsn == "" {
		log.Fatal("DB environment variable not set")
	}

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		// Customize connection pool settings as needed
		// Example:
		// PrepareStmt: true,
		// SkipDefaultTransaction: true,
	})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	// Enable SQL query logging for debugging (optional)
	// DB = DB.Debug()
}

