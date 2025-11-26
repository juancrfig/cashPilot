package models

import (
    "time"
	"github.com/google/uuid"
)

type RefreshTokens struct {
    ID        uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    UserID    uuid.UUID      `gorm:"type:uuid;not null"`
    Token     string         `gorm:"type:varchar(500);uniqueIndex;not null"`
    DeviceID  *string        `gorm:"type:varchar(255)"` // nullable
    ExpiresAt time.Time      `gorm:"not null"`
    Revoked   bool           `gorm:"default:false"`
    CreatedAt time.Time      `gorm:"autoCreateTime"`
    User Users `gorm:"foreignKey:UserID;references:ID"`

}