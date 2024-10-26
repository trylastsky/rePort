package main

import (
	"fmt"
	"time"

	"github.com/trylastsky/rePort/internal/config"
	"github.com/trylastsky/rePort/internal/database/mongodb"
	server "github.com/trylastsky/rePort/internal/http"
)

func main() {
	cfg := config.MustLoadPath("./.env")

	client := mongodb.ConnectMongoDB(cfg.DatabaseDST)
	datasetsCollection := mongodb.DatasetData(client, "datasetsCollection")

	storage := mongodb.NewStorage(client, datasetsCollection)

	fmt.Println(time.Now())
	serve := server.NewServe(storage)
	serve.Start("localhost", server.WithPort(8090))
}
