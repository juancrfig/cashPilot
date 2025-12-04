// handlers/auth/register.go
package auth

import (
    "net/http"
    "cashPilot/backend/models"
    "cashPilot/backend/utils"
	"cashPilot/backend/policies/auth"
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
)

type RegisterInput struct {
    Email     string `json:"email" binding:"required,email"`
    Password  string `json:"password" binding:"required,min=8"`
    FirstName string `json:"first_name"`
    LastName  string `json:"last_name"`
}

func Register(c *gin.Context, db *gorm.DB) {
    var input auth.RegisterRequest
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": "JSON inválido"})
        return
    }

    if errs := auth.ValidateRegister(input); errs != nil {
        c.JSON(400, gin.H{"errors": errs})
        return
    }
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Verificar si ya existe
    var exists models.Users
    if err := db.Where("email = ?", input.Email).First(&exists).Error; err == nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email ya registrado"})
        return
    }

    hashedPassword, _ := utils.HashPassword(input.Password)

    user := models.Users{
        Email:        input.Email,
        PasswordHash: hashedPassword,
        FirstName:    input.FirstName,
        LastName:     input.LastName,
        Status:       models.UserStatusActive,
    }

    if err := db.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear usuario"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "Usuario creado exitosamente",
        "user_id": user.ID,
    })
}