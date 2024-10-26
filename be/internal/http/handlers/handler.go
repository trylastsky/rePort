package handlers

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"github.com/trylastsky/rePort/internal/models"
)

var (
	ErrBindJson = errors.New("error bind json")
)

type DatasetProvider struct {
	dc DatasetCreator
	du DatasetUpdater
	dg DatasetGetter
}

type DatasetCreator interface {
	CreateDataset(ctx context.Context, data models.Dataset) (string, error)
}

type DatasetUpdater interface {
	UpdateDataset(ctx context.Context, data models.Dataset) error
	DeleteDataset(ctx context.Context, id string) error
}

type DatasetGetter interface {
	GetDatasetByID(ctx context.Context, id string) (*models.Dataset, error)
	GetDatasets() []models.Dataset
}

func New(
	datasetCreator DatasetCreator,
	datasetUpdater DatasetUpdater,
	datasetGetter DatasetGetter,

) *DatasetProvider {

	return &DatasetProvider{
		dc: datasetCreator,
		du: datasetUpdater,
		dg: datasetGetter,
	}
}

func (dp *DatasetProvider) CreateDataset() gin.HandlerFunc {
	return func(c *gin.Context) {
		type Request struct {
			Dataset models.Dataset `json:"dataset" binding:"required"`
		}

		var req Request

		if err := c.ShouldBindJSON(&req); err != nil {
			log.Err(err).Msg("error binding json")

			c.JSON(http.StatusBadRequest, gin.H{
				"error": ErrBindJson,
			})

			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		id, err := dp.dc.CreateDataset(ctx, req.Dataset)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"data": id,
			})
		}
	}
}

func (dp *DatasetProvider) UpdateDataset() gin.HandlerFunc {
	return func(c *gin.Context) {
		type Request struct {
			ID      string         `json:"id" binding:"required"`
			Dataset models.Dataset `json:"dataset" binding:"required"`
		}

		var req Request

		if err := c.ShouldBindJSON(&req); err != nil {
			log.Err(err).Msg("error binding json")

			c.JSON(http.StatusBadRequest, gin.H{
				"error": ErrBindJson,
			})

			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		err := dp.du.UpdateDataset(ctx, req.Dataset)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"data": "success",
			})
		}
	}
}

func (dp *DatasetProvider) DeleteDataset() gin.HandlerFunc {
	return func(c *gin.Context) {
		type Request struct {
			ID string `json:"id" binding:"required"`
		}

		var req Request

		if err := c.ShouldBindJSON(&req); err != nil {
			log.Err(err).Msg("error binding json")

			c.JSON(http.StatusBadRequest, gin.H{
				"error": ErrBindJson,
			})

			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		err := dp.du.DeleteDataset(ctx, req.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"data": "success",
			})
		}
	}
}

func (dp *DatasetProvider) GetDatasetByID() gin.HandlerFunc {
	return func(c *gin.Context) {
		type Request struct {
			ID string `json:"id" binding:"required"`
		}

		var req Request

		if err := c.ShouldBindJSON(&req); err != nil {
			log.Err(err).Msg("error binding json")

			c.JSON(http.StatusBadRequest, gin.H{
				"error": ErrBindJson,
			})

			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		dataset, err := dp.dg.GetDatasetByID(ctx, req.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"data": dataset,
			})
		}
	}
}

func (dp *DatasetProvider) GetDatasets() gin.HandlerFunc {
	return func(c *gin.Context) {

		res := dp.dg.GetDatasets()
		c.JSON(http.StatusOK, gin.H{
			"data": res,
		})
	}
}
