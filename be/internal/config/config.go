package config

import (
	"os"

	"github.com/ilyakaznacheev/cleanenv"
)

type Config struct {
	DatabaseDST string `env:"DB_DST"`
	Password    string `env:"DB_PASSWORD"`
	User        string `env:"DB_USER"`
	DBName      string `env:"DB_NAME"`
	SSLMode     string `env:"DB_SSLMODE"`

	MigrationsTable string `env:"DB_MIGRATIONTABLE"`
}

func MustLoadPath(configPath string) *Config {
	// check if file exists
	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		panic("config file does not exist: " + configPath)
	}

	var cfg Config

	if err := cleanenv.ReadConfig(configPath, &cfg); err != nil {
		panic("cannot read config: " + err.Error())
	}

	return &cfg
}
