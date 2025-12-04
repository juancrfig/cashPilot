// policies/auth/login.go
package auth

import (
	"strings" 

	"github.com/go-playground/validator/v10" 
)

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
}

func ValidateLogin(req LoginRequest) map[string]string {
	validate := validator.New()
	err := validate.Struct(req)
	if err == nil {
		return nil
	}

	errors := make(map[string]string)
	for _, e := range err.(validator.ValidationErrors) {
		field := strings.ToLower(e.Field())
		if e.Tag() == "required" {
			errors[field] = "Este campo es obligatorio"
		} else if e.Tag() == "email" {
			errors[field] = "Correo inválido"
		} else if e.Tag() == "min" {
			errors[field] = "Contraseña muy corta"
		}
	}
	return errors
}