package controllers

import (
    "os"
	"ecommerce-backend/initializers"
	"ecommerce-backend/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
)

func Signup(c *gin.Context) {
	//get email/pass from request body
	var body struct {
		Email   string
		Passwod string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body"})
		return
	}

	// hashthe password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Passwod), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to hash password"})
		return
	}
	// create the user
	user := models.User{Email: body.Email, Password: string(hash)}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to create user"})
		return
	}
	// respond
	c.JSON(http.StatusOK, gin.H{})

}
func Login(c *gin.Context) {
	//get email and password from user

	var body struct {
		Email   string
		Passwod string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body"})
		return
	}

	//look up email and password
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid email or password"})
		return
	}
	//compare pass with hash

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Passwod))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid email or password"})
		return

	}

	//generate jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to genereate Token"})
		return
	}

	//send it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{"message": user})
}
