package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/paulacgates/go-chatgpt-roteiros-app/database"
	"github.com/paulacgates/go-chatgpt-roteiros-app/models"
	"github.com/paulacgates/go-chatgpt-roteiros-app/tokens"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

func VerifyPassword(userPassword string, givenPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(givenPassword))
	valid := true
	msg := ""
	if err != nil {
		msg = "Login Or Passowrd is Incorrect"
		valid = false
	}
	return valid, msg
}

func MostrarRoteiros(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var p []models.Roteiro
	database.DB.Find(&p)
	json.NewEncoder(w).Encode(p)
}

func MostrarRoteiroPorId(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var p []models.Roteiro
	id := chi.URLParam(r, "id")
	err := database.DB.Where("user_id = ?", id).Find(&p)
	if err.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(p)

}

func CriarRoteiro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	user_id := chi.URLParam(r, "user_id")
	//var u models.Usuario
	var t models.Roteiro
	json.NewDecoder(r.Body).Decode(&t)
	t.User_Id, _ = strconv.ParseInt(user_id, 10, 64)
	question := "Faça um roteiro detalhado de " + t.Dias + " dias em " + t.Lugar
	t.Roteiro_gerado = GerarRoteiro(question)
	database.DB.Create(&t)
	json.NewEncoder(w).Encode(t)
}

func RemoverRoteiro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := chi.URLParam(r, "id")
	err := database.DB.Exec("DELETE FROM roteiros WHERE id_roteiro = ?", id)
	if err.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

}

func EditarRoteiro(w http.ResponseWriter, r *http.Request) {

}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user models.Usuario
	var founduser models.Usuario

	json.NewDecoder(r.Body).Decode(&user)
	founduser = user
	result := database.DB.Where("username = ?", user.Username).Find(&user)
	if result.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Error: Login or Password incorrect")
	}
	PasswordIsValid, msg := VerifyPassword(user.Password, founduser.Password)
	if !PasswordIsValid {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(msg)
		return
	}

	token, expirationTime := tokens.GenerateJWT(user.Username)
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/user",
		HttpOnly: false,
		Expires:  expirationTime,
	})
	json.NewEncoder(w).Encode(user)
}

func User(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var mySigningKey = []byte("jwtKey")
	c, err := r.Cookie("token")
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	tknStr := c.Value
	claims := &tokens.Claims{}

	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	})
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	C := tkn.Claims.(*tokens.Claims)
	var user models.Usuario
	database.DB.Where("username = ?", C.Username).First(&user)
	json.NewEncoder(w).Encode(user)
}

func Signup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	validate := validator.New()
	var user models.Usuario

	json.NewDecoder(r.Body).Decode(&user)
	validationErr := validate.Struct(user)
	if validationErr != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	if user.Username == "" || user.Email == "" || user.Nome == "" || user.Password == "" {
		w.WriteHeader(http.StatusInternalServerError)
	}
	result := database.DB.Where("username = ?", user.Username).First(&user)
	if result.Error != nil {
		json.NewEncoder(w).Encode("Usuario pode ser criado...")
	}
	if result.RowsAffected > 0 {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Usuario ja existe")
	} else {
		// DADOS
		password := HashPassword(user.Password)
		user.Password = password
		result = database.DB.Create(&user)
		//

		if result.Error != nil {
			json.NewEncoder(w).Encode(http.StatusInternalServerError)
		}
		json.NewEncoder(w).Encode("Usuario criado com sucesso")
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	})
}
