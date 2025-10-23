package models

// paquetes para poder obtener el tiempo en los campos: created_at, updated_at y deleted_at
import (
    "time"
	"github.com/google/uuid"
)

// Declarar el enum para los estados del usuario, se usa en el campo status de la tabla users
type UserStatus string

const (
    UserStatusActive   UserStatus = "active"
    UserStatusInactive UserStatus = "inactive"

)

type Users struct {
    id             uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    email          string         `gorm:"type:varchar(255);not null;uniqueIndex"`
    password_hash   string         `gorm:"type:varchar(255);not null"`
    first_name      string         `gorm:"type:varchar(255)"`
    last_name       string         `gorm:"type:varchar(255)"`
    status         UserStatus     `gorm:"type:user_status;not null"` 
    email_verified_at *time.Time    `gorm:"type:timestamp"`
    created_at      time.Time      `gorm:"type:timestamp;not null;default:current_timestamp"`
    updated_at      time.Time      `gorm:"type:timestamp;not null;default:current_timestamp"`
    deleted_at      *time.Time     `gorm:"type:timestamp;index"` 
}

type Sessions struct {
    id        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    user_id    uuid.UUID `gorm:"type:uuid;not null;index"`
    ip_address string    `gorm:"type:varchar(45);not null"` 
    user_agent string    `gorm:"type:varchar(500);not null"`
    last_activity time.Time `gorm:"type:timestamp;not null;default:current_timestamp"`
    expires_at  time.Time `gorm:"type:timestamp;not null"`
    created_at  time.Time `gorm:"type:timestamp;not null;default:current_timestamp"`
}

type RefreshTokens struct {
    id     uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    user_id uuid.UUID `gorm:"type:uuid;not null;index"`
    token  string    `gorm:"type:varchar(500);not null;uniqueIndex"`
    device_id string  `gorm:"type:varchar(255)"` 
    expires_at time.Time `gorm:"type:timestamp;not null"`
    revoked bool     `gorm:"type:boolean;default:false"`
    created_at time.Time `gorm:"type:timestamp;not null;default:current_timestamp"`
}

// Relaciones (opcional, para queries)
func (u *Users) Sessions() []*Sessions {
    return []*Sessions{}  
}

func (s *Sessions) User() *Users {
    return &Users{}  
}

func (r *RefreshTokens) User() *Users {
    return &Users{} 
}