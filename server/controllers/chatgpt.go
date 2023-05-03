package controllers

import (
	"context"
	"fmt"
	"log"

	openai "github.com/sashabaranov/go-openai"
	"github.com/spf13/viper"
)

func GerarRoteiro(question string) string {
	viper.SetConfigFile(".env")
	viper.ReadInConfig()
	apikey := viper.GetString("API_KEY")
	if apikey == "" {
		log.Fatal("Missing API KEY")
	}
	client := openai.NewClient(apikey)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:     openai.GPT3Dot5Turbo,
			MaxTokens: 3000,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: question,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return ""
	}

	return resp.Choices[0].Message.Content
}
