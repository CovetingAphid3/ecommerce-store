package initializers

import "ecommerce-backend/models"

func SyncDatabase() {
	// Migrate the schema using the global DB instance
	if err := DB.AutoMigrate(&models.User{}, &models.Product{}, &models.Order{}); err != nil {
		// Handle error (log, panic, return an error, etc.)
		panic("Failed to perform auto migration: " + err.Error())
	}
}
