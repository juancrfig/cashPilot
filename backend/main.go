package main

import (
	"fmt"
	"log"

	"cashPilot/backend/config"
	"cashPilot/backend/database"
	"cashPilot/backend/models"


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

	

	// AutoMigrate
	err := db.AutoMigrate(
		&models.Users{},
		&models.Sessions{},
		&models.RefreshTokens{},
	)
	if err != nil {
		log.Fatal("Error ejecutando migraciones:", err)
	}

	fmt.Println("Migraciones ejecutadas correctamente!")
}
