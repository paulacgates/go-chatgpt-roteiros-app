package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/paulacgates/go-chatgpt-roteiros-app/controllers"
)

func HandleRouter() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	HandleCors(r)
	HandleRequest(r)
	http.ListenAndServe(":8000", r)

}

func HandleCors(r chi.Router) {
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"http://localhost:4200", "http://localhost:4200/home"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

}

func HandleRequest(r chi.Router) {

	//r.Get("/", controllers.a)
	r.Get("/user", controllers.User)
	r.Get("/logout", controllers.Logout)
	r.Get("/roteiros", controllers.MostrarRoteiros)
	r.Get("/{id}/roteiros", controllers.MostrarRoteiroPorId)
	r.Post("/{user_id}/criar-roteiro", controllers.CriarRoteiro)
	r.Delete("/deletar-roteiro/{id}", controllers.RemoverRoteiro)
	r.Post("/account/signup", controllers.Signup)
	r.Post("/account/login", controllers.Login)

}
