package main

import (
    "fmt"
    "log"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "cashPilot/backend/Models"
)


func main() {
    // Conectar base de datos de manera automática (prueba sin variables de entorno)

    dsn := "host=localhost user=postgres password=123456 dbname=cashpilot_db port=5432 sslmode=disable"
    
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Error conectando DB:", err)
    }

    fmt.Println("Conectado a PostgreSQL!")

    // Migrar tablas
    err = db.AutoMigrate(
        &models.Users{},
        &models.Sessions{},
        &models.RefreshTokens{},
    )
    if err != nil {
        log.Fatal(" Error migrando:", err)
    }

    fmt.Println(" ¡BASE DE DATOS CREADA EXITOSAMENTE!")
   
}

//  Función para conexión reutilizable
// func connectDB() (*gorm.DB, error) {
//     // Variables de entorno 
//     dsn := fmt.Sprintf(
//         "host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
//         getEnv("DB_HOST", "localhost"),
//         getEnv("DB_USER", "postgres"),
//         getEnv("DB_PASSWORD", "123456"),
//         getEnv("DB_NAME", "cashpilot_db"),
//         getEnv("DB_PORT", "5432"),
//         getEnv("DB_SSLMODE", "disable"),
//         getEnv("DB_TIMEZONE", "America/Mexico_City"),
//     )

//     db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
//     if err != nil {
//         return nil, err
//     }

//     // Verificar conexión
//     sqlDB, err := db.DB()
//     if err != nil {
//         return nil, err
//     }
//     if err = sqlDB.Ping(); err != nil {
//         return nil, err
//     }

//     return db, nil
// }

// //  Helper para variables de entorno con defaults
// func getEnv(key, defaultValue string) string {
//     if value := os.Getenv(key); value != "" {
//         return value
//     }
//     return defaultValue
// }
