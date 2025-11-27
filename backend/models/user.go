package models

import (
    "time"
    "github.com/google/uuid"
    "gorm.io/gorm"
)

type UserStatus string

const (
    UserStatusActive   UserStatus = "active"
    UserStatusInactive UserStatus = "inactive"

)

type Users struct {
    ID              uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    Email           string         `gorm:"type:varchar(255);uniqueIndex;not null"`
    PasswordHash    string         `gorm:"column:password_hash;type:varchar(255);not null"`
    FirstName       string         `gorm:"type:varchar(255)"`
    LastName        string         `gorm:"type:varchar(255)"`
    Status          UserStatus     `gorm:"type:userstatus;default:'active';not null"`
    EmailVerifiedAt *time.Time     `gorm:"column:email_verified_at"`
    CreatedAt       time.Time      `gorm:"autoCreateTime"`
    UpdatedAt       time.Time      `gorm:"autoUpdateTime"`
    DeletedAt       gorm.DeletedAt `gorm:"index"`
}

// Método para el nombre completo del usuario
func (u *Users) FullName() string {
    return u.FirstName + " " + u.LastName
}