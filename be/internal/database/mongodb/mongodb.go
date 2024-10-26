package mongodb

import (
	"context"
	"time"

	log "github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Storage struct {
	Client     *mongo.Client
	collection *mongo.Collection
}

func NewStorage(client *mongo.Client, collection *mongo.Collection) *Storage {
	return &Storage{
		Client:     client,
		collection: collection,
	}
}

func ConnectMongoDB(dst string) *mongo.Client {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(dst)) // mongodb://localhost:27017
	if err != nil {
		panic(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Info().Msg("failed to connect to mongodb :(")
		panic(err)
	}

	log.Info().Msg("Successfully connected to mongodb")

	return client
}
