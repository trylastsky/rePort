package mongodb

import (
	"context"
	"fmt"
	"time"

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

func (s *Storage) CreateDataset(ctx context.Context, data models.Dataset) (string, error) {
	// _, err := s.collection.Find(ctx, bson.M{"_id": data.ID})
	// if err != nil {
	// 	log.Err(err).Msg("error to create dataset")
	// 	return err
	// }

	data.ID = primitive.NewObjectID()

	fmt.Println(data.ID)

	_, err := s.collection.InsertOne(ctx, data)
	fmt.Println(err)
	return data.ID.Hex(), err
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

func (s *Storage) GetDatasetByID(ctx context.Context, _id string) (*models.Dataset, error) {
	id, err := primitive.ObjectIDFromHex(_id)
	if err != nil {
		return nil, err
	}
	var dataset *models.Dataset

	err = s.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&dataset)
	if err != nil {
		log.Err(err).Msg("error decode dataset")
		return nil, err
	}

	return dataset, nil
}

func (s *Storage) GetDatasets() []models.Dataset {
	var advertisementList []models.Dataset
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	cursor, err := s.collection.Find(ctx, bson.D{{}})
	if err != nil {
		return nil
	}

	err = cursor.All(ctx, &advertisementList)
	if err != nil {
		return nil
	}

	defer cursor.Close(ctx)
	if err := cursor.Err(); err != nil {
		return nil
	}

	defer cancel()

	return advertisementList
}
