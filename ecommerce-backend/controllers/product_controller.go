package controllers

import (
	"ecommerce-backend/initializers"
	"ecommerce-backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Function to parse product ID
func parseProductID(c *gin.Context) (uint64, error) {
	productID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return 0, err
	}
	return productID, nil
}

// ceate
func CreateProduct(c *gin.Context) {
	var body struct {
		Name        string  `json:"name"`
		Description string  `json:"description"`
		Price       float64 `json:"price"`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body"})
		return
	}

	product := models.Product{Name: body.Name, Description: body.Description, Price: body.Price}
	result := initializers.DB.Create(&product)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to create poduct"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "product created succesfully"})

}

// read
func GetAllProducts(c *gin.Context) {
	var products []models.Product
	// Get all records
	result := initializers.DB.Find(&products)
	// SELECT * FROM users;
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failedto fetch products"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"products": products})
}
func GetProductById(c *gin.Context) {
	productID, err := parseProductID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid poduct ID"})
		return
	}

	var product models.Product
	result := initializers.DB.First(&product, productID)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch poduct"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"product": product})

}

// update
func UpdateProduct(c *gin.Context) {

	var body struct {
		Name        string  `json:"name"`
		Description string  `json:"description"`
		Price       float64 `json:"price"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body"})
		return
	}

	productID, err := parseProductID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid poduct ID"})
		return
	}
	var existingProduct models.Product
	result := initializers.DB.First(&existingProduct, productID)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	existingProduct.Name = body.Name
	existingProduct.Description = body.Description
	existingProduct.Price = body.Price

	result = initializers.DB.Save(&existingProduct)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to update product"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "product updated successfully"})

}

// delete
func DeleteProduct(c *gin.Context) {
	productID, err := parseProductID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid product ID"})
		return
	}

	var product models.Product

	// Check if the product exists before attempting to delete
	result := initializers.DB.First(&product, productID)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	// Delete the product from the database
	result = initializers.DB.Delete(&product, productID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete product"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "product deleted successfully"})
}
