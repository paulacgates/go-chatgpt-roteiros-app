package main

import (
	"github.com/paulacgates/go-chatgpt-roteiros-app/database"
	"github.com/paulacgates/go-chatgpt-roteiros-app/routes"
)

func main() {
	database.InitDatabase()
	routes.HandleRouter()
}
