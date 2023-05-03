package tokens

import (
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var SignInKey = []byte("jwtKey")

type Claims struct {
	Username string `json:"Username"`
	jwt.RegisteredClaims
}

func GenerateJWT(username string) (string, time.Time) {
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(SignInKey)

	if err != nil {
		log.Fatal("Something Went Wrong:", err.Error())
	}
	return tokenString, expirationTime

}
