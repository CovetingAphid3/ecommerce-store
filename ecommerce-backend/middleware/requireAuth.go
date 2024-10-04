package middleware

import (
    "ecommerce-backend/initializers"
    "ecommerce-backend/models"
    "fmt"
    "log"
    "net/http"
    "os"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

// RequireAuth is a middleware function to protect routes from unauthorized access
func RequireAuth(c *gin.Context) {
    // Get the token from the cookie
    tokenString, err := c.Cookie("Authorization")
    if err != nil {
        c.AbortWithStatus(http.StatusUnauthorized) // Unauthorized if no token is found
        return
    }

    // Parse and validate the token
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        // Validate the token signing method
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
        }
        // Return the secret key for validation
        return []byte(os.Getenv("SECRET")), nil
    })

    if err != nil {
        log.Printf("Error parsing token: %v", err) // Log the error
        c.AbortWithStatus(http.StatusUnauthorized)
        return
    }

    // Check if the token claims are valid
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        // Check the expiration time of the token
        if float64(time.Now().Unix()) > claims["exp"].(float64) {
            c.AbortWithStatus(http.StatusUnauthorized) // Token expired
            return
        }

        // Retrieve the user ID from the token claims
        var user models.User
        initializers.DB.First(&user, claims["sub"]) // Use the user ID in the claims

        if user.ID == 0 {
            c.AbortWithStatus(http.StatusUnauthorized) // User not found
            return
        }

        // Attach the user to the context
        c.Set("user", user)
        c.Next() // Proceed to the next handler
    } else {
        c.AbortWithStatus(http.StatusUnauthorized) // Invalid token
    }
}

