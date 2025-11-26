package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadDotEnv() error {
	return godotenv.Load()
}

func mustGetEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("enviroment variable=%s is missing, app can't start ", key)
	}
	return value
}

func getEnv(key string, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		value = defaultValue
		return value
	}
	return value
}

func LoadDSN() string {
	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		getEnv("DB_HOST", "localhost"),
		mustGetEnv("DB_USER"),
		mustGetEnv("DB_PASSWORD"),
		mustGetEnv("DB_NAME"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_SSLMODE", "disable"), // (Secure Sockets Layer) protocolo que cifra datos entre un servidor y un cliente,
		// en este caso esta desactivado(disable) pq es local, pero si queremos usar una db de un servidor debe estar en
		// "require"
	)
}
