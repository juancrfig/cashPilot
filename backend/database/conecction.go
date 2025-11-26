package database

import (
	"cashPilot/backend/config"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

	// Variables de entorno con valores por defecto perfectos para desarrollo local
	
func Connect()*gorm.DB{
	dsn := config.LoadDSN()
	db,err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("connection to db has failed: %v", err)
	}
	return db
}