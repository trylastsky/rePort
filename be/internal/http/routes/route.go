package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/trylastsky/rePort/internal/database/mongodb"
	"github.com/trylastsky/rePort/internal/http/handlers"
)

func Routes(incomingRoutes *gin.Engine, db *mongodb.Storage) {
	datasetProvider := handlers.New(db, db, db)

	incomingRoutes.POST("api-v1/create", datasetProvider.CreateDataset())
	incomingRoutes.POST("api-v1/delete", datasetProvider.DeleteDataset())
	incomingRoutes.POST("api-v1/update", datasetProvider.UpdateDataset())
	incomingRoutes.POST("api-v1/getbyid", datasetProvider.GetDatasetByID())

}
