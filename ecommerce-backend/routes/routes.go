package api

import (
	"ecommerce-backend/controllers"
	"github.com/gin-gonic/gin"
    "ecommerce-backend/middleware"
)

func Routes(r *gin.Engine) {
	r.GET("/categories", controllers.GetCategories)
	r.POST("/create-product", controllers.CreateProduct)
	r.GET("/products", controllers.GetAllProducts)
	r.GET("/products/:id", controllers.GetProductById)
	r.PUT("/products/:id", controllers.UpdateProduct)
	r.DELETE("/products/:id", controllers.DeleteProduct)
	r.POST("/users/signup", controllers.Signup)
	r.POST("/users/login", controllers.Login)
	r.GET("/users/validate", middleware.RequireAuth, controllers.Validate)
    r.POST("/orders",controllers.CreateOrder)
    r.GET("/orders/:id",controllers.GetOrderById)
    r.PUT("/orders/:id",controllers.UpdateOrder)
    r.GET("/orders",controllers.GetAllOrders)
    r.DELETE("/orders/:id",controllers.DeleteOrder)
}
