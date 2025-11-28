package routes

import (
    "cashPilot/backend/controllers"
    "github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
    r.POST("/users", controllers.CreateUser)
    r.GET("/users", controllers.GetUsers)
    r.GET("/users/:id", controllers.GetUserByID)
    r.PUT("/users/:id", controllers.UpdateUser)
    r.DELETE("/users/:id", controllers.DeleteUser)
}
