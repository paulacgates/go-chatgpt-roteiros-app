package models

type Roteiro struct {
	Id_Roteiro     int64  `json:"id_roteiro" gorm:"primaryKey;autoIncrement:true"`
	Lugar          string `json:"lugar"`
	Dias           string `json:"dias"`
	Roteiro_gerado string `json:"roteiro_gerado" gorm:"type:Long" `
	User_Id        int64  `json:"user_id" gorm:"foreignKey:Id_Usuario"`
}

type Usuario struct {
	Id_Usuario int64  `json:"id_usuario" gorm:"primaryKey;autoIncrement:true"`
	Nome       string `json:"nome" gorm:"not null"`
	Email      string `json:"email" gorm:"unique" gorm:"required;not null"`
	Username   string `json:"username" gorm:"required;not null"`
	Password   string `json:"password" gorm:"required;not null"`
	//Roteiros   Roteiro `json:"roteiro" gorm:"foreignKey:Id_Roteiro"`
}
