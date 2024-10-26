package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Dataset struct {
	ID      primitive.ObjectID `json:"_id" bson:"_id"`
	Reports []Report           `json:"reports" bson:"reports"`
}

type Report struct {
	EntityID     primitive.ObjectID `json:"entity_id" bson:"entity_id"`
	CreatedAt    *string            `json:"create_date"`
	PropertyName *string            `json:"property_name"`
	OldValue     *string            `json:"old_value"`
	NewValue     *string            `json:"new_value"`
}
