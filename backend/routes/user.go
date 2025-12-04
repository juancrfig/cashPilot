// routes/user.go
package routes

import (
    "cashPilot/backend/handlers/auth"
    "cashPilot/backend/models"
    "cashPilot/backend/middleware"  
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
)

func AuthRoutes(r *gin.RouterGroup, db *gorm.DB) {
    user := r.Group("/user")

    // Rutas públicas
    user.POST("/register", func(c *gin.Context) { auth.Register(c, db) })
    user.POST("/login",    func(c *gin.Context) { auth.Login(c, db) })

    // Rutas protegidas
    protected := user.Group("/")
    protected.Use(middleware.AuthMiddleware())
    {
        protected.GET("/me", Me)
        // aquí puedes añadir más: /profile, /settings, etc.
    }
}

func Me(c *gin.Context) {
    userID := c.GetString("user_id")
    db := c.MustGet("db").(*gorm.DB)

    var user models.Users
    if err := db.Select("id, email, first_name, last_name, status").
        First(&user, "id = ?", userID).Error; err != nil {
        c.JSON(404, gin.H{"error": "Usuario no encontrado"})
        return
    }

    c.JSON(200, gin.H{
        "id":         user.ID,
        "email":      user.Email,
        "first_name": user.FirstName,
        "last_name":  user.LastName,
        "status":     user.Status,
    })
}