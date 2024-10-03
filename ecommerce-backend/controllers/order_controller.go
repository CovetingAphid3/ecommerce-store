package controllers

import (
	"ecommerce-backend/initializers"
	"ecommerce-backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Function to parse product ID
func parseOrderID(c *gin.Context) (uint64, error) {
	productID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return 0, err
	}
	return productID, nil
}


func CreateOrder(c *gin.Context) {
	var body struct {
		UserID     uint    `json:"user_id"`
		ProductID  uint    `json:"product_id"`
		Quantity   uint    `json:"quantity"`
		TotalPrice float64 `json:"total_price"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body"})
		return
	}

	order := models.Order{
		UserID:     body.UserID,
		ProductID:  body.ProductID,
		Quantity:   body.Quantity,
		TotalPrice: body.TotalPrice,
	}

	result := initializers.DB.Create(&order)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to create order"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "order created successfully"})
}

func GetAllOrders(c *gin.Context) {
	var orders []models.Order

	result := initializers.DB.Find(&orders)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch orders"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}

func GetOrderById(c *gin.Context) {
	orderId, err := parseOrderID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid oder id"})
	}
	var order models.Order
	result := initializers.DB.First(&order, orderId)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"order": order})
}

func UpdateOrder(c *gin.Context) {
	orderID, err := parseOrderID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid order id"})
		return
	}

	var updatedOrder models.Order
	if err := c.BindJSON(&updatedOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body"})
		return
	}

	var existingOrder models.Order
	result := initializers.DB.First(&existingOrder, orderID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
		return
	}

	// Update the existing order with the new values
	initializers.DB.Model(&existingOrder).Updates(&updatedOrder)

	c.JSON(http.StatusOK, gin.H{"message": "order updated successfully"})
}

func DeleteOrder(c *gin.Context) {

	orderID, err := parseOrderID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid order id"})
		return
	}
	var order models.Order
	result := initializers.DB.Delete(&order, orderID)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete order"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "order deleted succefully"})
}
