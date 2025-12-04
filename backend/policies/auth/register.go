// policies/auth/register_policy.go
package auth

import (
    "regexp"
    "strings"

    "github.com/go-playground/validator/v10"
)

type RegisterRequest struct {
    Email     string `json:"email" validate:"required,email"`
    Password  string `json:"password" validate:"required,min=6,password_strength"`
    FirstName string `json:"first_name" validate:"omitempty,max=50"`
    LastName  string `json:"last_name" validate:"omitempty,max=50"`
}

// Validador personalizado: fuerza al menos 1 letra y 1 número
var passwordStrength validator.Func = func(fl validator.FieldLevel) bool {
    pwd := fl.Field().String()
    hasLetter := regexp.MustCompile(`[a-zA-Z]`).MatchString(pwd)
    hasNumber := regexp.MustCompile(`[0-9]`).MatchString(pwd)
    return hasLetter && hasNumber
}

// Función reutilizable para cualquier registro
func ValidateRegister(req RegisterRequest) map[string]string {
    validate := validator.New()
    validate.RegisterValidation("password_strength", passwordStrength)

    err := validate.Struct(req)
    if err == nil {
        return nil
    }

    errors := make(map[string]string)
    for _, err := range err.(validator.ValidationErrors) {
        field := strings.ToLower(err.Field())
        switch err.Tag() {
        case "required":
            errors[field] = "Este campo es obligatorio"
        case "email":
            errors[field] = "Debe ser un email válido"
        case "min":
            errors[field] = "La contraseña debe tener al menos 6 caracteres"
        case "password_strength":
            errors[field] = "La contraseña debe contener letras y números"
        default:
            errors[field] = err.Error()
        }
    }
    return errors
}