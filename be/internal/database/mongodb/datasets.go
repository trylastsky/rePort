package mongodb

import (
	"context"

	log "github.com/rs/zerolog/log"
	"github.com/trylastsky/rePort/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func DatasetData(client *mongo.Client, collectionName string) *mongo.Collection {
	var datasetsCollection *mongo.Collection = client.Database("Datasets").Collection(collectionName)
	return datasetsCollection
}

func (s *Storage) CreateDataset(ctx context.Context, data models.Dataset) error {
	_, err := s.collection.Find(ctx, bson.M{"_id": data.ID})
	if err != nil {
		log.Err(err).Msg("error to create dataset")
		return err
	}

	_, err = s.collection.InsertOne(ctx, data)

	return err
}

func (s *Storage) UpdateDataset(ctx context.Context, data models.Dataset) error {
	_, err := s.collection.Find(ctx, bson.M{"_id": data.ID})
	if err != nil {
		log.Err(err).Msg("error to update dataset")
		return err
	}

	_, err = s.collection.UpdateOne(ctx, bson.M{"_id": data.ID}, data)

	return err
}

func (s *Storage) DeleteDataset(ctx context.Context, id string) error {
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = s.collection.Find(ctx, bson.M{"_id": _id})
	if err != nil {
		log.Err(err).Msg("error to delete dataset")
		return err
	}

	_, err = s.collection.DeleteOne(ctx, bson.M{"_id": _id})

	return err
}

func (s *Storage) GetDatasetByID(ctx context.Context, id string) (*models.Dataset, error) {
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	_, err = s.collection.Find(ctx, bson.M{"_id": _id})
	if err != nil {
		log.Err(err).Msg("error to get by id dataset")
		return nil, err
	}

	result := s.collection.FindOne(ctx, bson.M{"_id": _id})

	var dataset *models.Dataset
	err = result.Decode(dataset)
	if err != nil {
		log.Err(err).Msg("error decode dataset")
		return nil, err
	}

	return dataset, nil
}

func (s *Storage) GetDatasets(ctx context.Context) {

}
