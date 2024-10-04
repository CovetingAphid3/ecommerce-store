package api

import (
	"ecommerce-backend/controllers"
	"ecommerce-backend/middleware"

	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {
	// Public routes
	r.GET("/categories", controllers.GetCategories)
	r.POST("/users/signup", controllers.Signup)
	r.POST("/users/login", controllers.Login)

	// User routes (protected)
	r.GET("users/validate", middleware.RequireAuth, controllers.Validate)

	// Product routes
	r.GET("/products", controllers.GetAllProducts)
	r.GET("/products/:id", controllers.GetProductById)
	r.POST("/products/", middleware.RequireAuth, controllers.CreateProduct)      // Require auth for creating products
	r.PUT("/products/:id", middleware.RequireAuth, controllers.UpdateProduct)    // Require auth for updating products
	r.DELETE("/products/:id", middleware.RequireAuth, controllers.DeleteProduct) // Require auth for deleting products

	// Order routes (protected)
	r.Use(middleware.RequireAuth) // Protect all order routes with authentication
	r.POST("/orders", controllers.CreateOrder)
	r.GET("orders/:id", controllers.GetOrderById)
	r.GET("orders/", controllers.GetAllOrders)
	r.PUT("orders/:id", controllers.UpdateOrder)
	r.DELETE("orders/:id", controllers.DeleteOrder)
}
