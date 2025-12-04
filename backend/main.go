package main

import (
	"cashPilot/backend/config"
    "cashPilot/backend/database"
    "cashPilot/backend/models"
    "cashPilot/backend/routes"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"


)

// init() se ejecuta antes del main → carga el .env si existe
func init() {
	// En producción (Supabase, Railway, Render, etc.) no necesitas .env → ignora el error
	if err := config.LoadDotEnv(); err != nil {
		fmt.Println("no se encontro el .env -> se ignorara, error:", err)
	}
}


func main() {

	db := database.Connect()

	db.Exec(`DO $$ BEGIN
	    CREATE TYPE userstatus AS ENUM ('active', 'inactive');
	EXCEPTION WHEN duplicate_object THEN NULL;
	END $$;`)

	err := db.AutoMigrate(&models.Users{})
	if err != nil {
		log.Fatal("Error migrando Users:", err)
	}

	err = db.AutoMigrate(
		&models.Sessions{},
		&models.RefreshTokens{},
	)
	
	if err != nil {
		log.Fatal("Error ejecutando migraciones:", err)
	}

	fmt.Println("Migraciones ejecutadas correctamente!")

    r := gin.Default()

    // Pasar DB a todas las rutas
    r.Use(func(c *gin.Context) {
        c.Set("db", db)
        c.Next()
    })

    api := r.Group("/api")
    routes.AuthRoutes(api, db)

    r.Run(":8080")

    fmt.Println("Servidor corriendo en http://localhost:8080")
}
