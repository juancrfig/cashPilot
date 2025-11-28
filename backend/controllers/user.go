package controllers

import (
    "cashPilot/backend/database"
    "cashPilot/backend/models"
    "net/http"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
    var body models.UserInput

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
        return
    }

    user := models.Users{
        Email:        body.Email,
        PasswordHash: string(hashedPassword),
        FirstName:    body.FirstName,
        LastName:     body.LastName,
        Status:       models.UserStatusActive,
    }

    db := database.Connect()
    if err := db.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, user)
}

func GetUsers(c *gin.Context) {
    var users []models.Users
    db := database.Connect()

    if err := db.Find(&users).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, users)
}

func GetUserByID(c *gin.Context) {
    id := c.Param("id")
    db := database.Connect()

    var user models.Users
    if err := db.First(&user, "id = ?", id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    c.JSON(http.StatusOK, user)
}

func UpdateUser(c *gin.Context) {
    id := c.Param("id")
    db := database.Connect()

    var user models.Users
    if err := db.First(&user, "id = ?", id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    var body models.UserInput
    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

    user.Email = body.Email
    user.FirstName = body.FirstName
    user.LastName = body.LastName
    user.PasswordHash = string(hashedPassword)

    if err := db.Save(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
    id := c.Param("id")
    db := database.Connect()

    if err := db.Delete(&models.Users{}, "id = ?", id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}
