package models

import (
    "time"
    "github.com/google/uuid"
)

type Sessions struct {
    ID           uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    UserID       uuid.UUID      `gorm:"type:uuid;not null"`
    IPAddress    string         `gorm:"column:ip_address;type:varchar(45);not null"`
    UserAgent    string         `gorm:"column:user_agent;type:varchar(500);not null"`
    LastActivity time.Time      `gorm:"column:last_activity;autoUpdateTime"`
    ExpiresAt    time.Time      `gorm:"column:expires_at;not null"`
    CreatedAt    time.Time      `gorm:"autoCreateTime"`
    User Users `gorm:"foreignKey:UserID;references:ID"`
}