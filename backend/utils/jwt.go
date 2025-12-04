// utils/jwt.go
package utils

import (
    "time"
    "github.com/golang-jwt/jwt/v5"
    "cashPilot/backend/models"
)

var JwtKey = []byte("tu_secreto_muy_largo_y_seguro_aqui_cambia_esto")

type Claims struct {
    UserID   string `json:"user_id"`
    Email    string `json:"email"`
    jwt.RegisteredClaims
}

func GenerateJWT(user models.Users) (string, error) {
    expirationTime := time.Now().Add(15 * time.Minute)
    claims := &Claims{
        UserID: user.ID.String(),
        Email:  user.Email,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(expirationTime),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(JwtKey)
}

func GenerateRefreshToken() string {
    // En producción usa crypto/rand + base64
    return "refresh_" + time.Now().Format(time.RFC3339Nano) + "_random"
}