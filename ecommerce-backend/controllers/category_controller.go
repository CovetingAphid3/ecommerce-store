// controllers/category_controller.go
package controllers

import (
	"ecommerce-backend/initializers"
	"ecommerce-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetCategories returns all categories
func GetCategories(c *gin.Context) {
	var categories []models.Category
	result := initializers.DB.Find(&categories)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch categories"})
		return
	}

	// Extract category names
	var categoryNames []string
	for _, category := range categories {
		categoryNames = append(categoryNames, category.Name)
	}

	c.JSON(http.StatusOK, categoryNames)
}

