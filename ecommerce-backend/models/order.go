package models

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	UserID     uint
	ProductID  uint
	Quantity   uint `gorm:"not null"`
	TotalPrice float64
}
