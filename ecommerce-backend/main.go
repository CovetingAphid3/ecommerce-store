package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
    // Create a new Gin router
    r := gin.Default()

    // Define a route for the root endpoint
    r.GET("/", func(c *gin.Context) {
        c.String(http.StatusOK, "Welcome to the eCommerce API")
    })

    // Start the server on port 8000
	log.Println("Server is running on http://localhost:8000")
    if err := r.Run(":8000"); err != nil {
        log.Fatal(err)
    }
}

