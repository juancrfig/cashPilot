package main

import (
	"fmt"
	"log"
	"os"

	"cashPilot/backend/Models" 

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// init() se ejecuta antes del main → carga el .env si existe
func init() {
	// En producción (Supabase, Railway, Render, etc.) no necesitas .env → ignora el error
	_ = godotenv.Load()
}

func main() {
	// Variables de entorno con valores por defecto perfectos para desarrollo local
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "123456"),
		getEnv("DB_NAME", "cashpilot_db"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_SSLMODE", "disable"), // en Supabase será "require"
	)

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

// Helper para leer variables de entorno con fallback
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
                    
                    // func main() {
                    //     // Conectar base de datos de manera automática (prueba sin variables de entorno)
                    
                    //     dsn := "host=localhost user=postgres password=123456 dbname=cashpilot_db port=5432 sslmode=disable"
                        
                    //     db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
                    //     if err != nil {
                    //         log.Fatal("Error conectando DB:", err)
                    //     }
                    
                    //     fmt.Println("Conectado a PostgreSQL!")
                    
                    //     // Migrar tablas
                    //     err = db.AutoMigrate(
                    //         &models.Users{},
                    //         &models.Sessions{},
                    //         &models.RefreshTokens{},
                    //     )
                    //     if err != nil {
                    //         log.Fatal(" Error migrando:", err)
                    //     }
                    
                    //     fmt.Println(" ¡BASE DE DATOS CREADA EXITOSAMENTE!")
                       
                    // }