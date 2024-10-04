package models

import "gorm.io/gorm"

type Product struct {
    gorm.Model
    Name        string  `json:"name" gorm:"not null"`
    Description string  `json:"description" gorm:"not null"`
    Category    string  `json:"category" gorm:"not null"`
    Price       float64 `json:"price" gorm:"not null"`
}
