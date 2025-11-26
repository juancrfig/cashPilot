package main

import (
	"fmt"
	"log"

	"cashPilot/backend/Models"
	"cashPilot/backend/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// init() se ejecuta antes del main → carga el .env si existe
func init() {
	// En producción (Supabase, Railway, Render, etc.) no necesitas .env → ignora el error
	if err := config.LoadDotEnv(); err != nil {
		fmt.Println("no se encontro el .env -> se ignorara, error:", err)
	}
}

func main() {
	// Variables de entorno con valores por defecto perfectos para desarrollo local
	dsn := config.LoadDSN()

	// Opcional: puedes usar una URL completa también (más cómodo en Supabase)
	// dsn := getEnv("DATABASE_URL", dsn) // si prefieres usar DATABASE_URL directamente

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error conectando a la base de datos:", err)
	}

	fmt.Println("Conectado a PostgreSQL correctamente!")

	// AutoMigrate
	err = db.AutoMigrate(
		&models.Users{},
		&models.Sessions{},
		&models.RefreshTokens{},
	)
	if err != nil {
		log.Fatal("Error ejecutando migraciones:", err)
	}

	fmt.Println("Migraciones ejecutadas correctamente!")
}
