//go:generate oapi-codegen --config=models.cfg.yaml ../openapi.yaml
//go:generate oapi-codegen --config=server.cfg.yaml ../openapi.yaml

package api

import (
	"net/http"
	"sync"

	"github.com/Max-Sepp/url-shortner/api/models"
	"github.com/labstack/echo/v4"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

type UrlStore struct {
	Urls map[string]string
	Lock sync.RWMutex
}

func NewUrlStore() *UrlStore {
	return &UrlStore{
		Urls: make(map[string]string),
	}
}

func (s *UrlStore) GetShortenUrl(ctx echo.Context, code string) error {
	s.Lock.RLock()
	defer s.Lock.RUnlock()

	url := s.Urls[code]

	if url == "" {
		return ctx.NoContent(http.StatusNotFound)
	}

	return ctx.Redirect(http.StatusTemporaryRedirect, url)
}

func (s *UrlStore) ShortenUrl(ctx echo.Context) error {

	var UrlStruct models.URL
	err := ctx.Bind(&UrlStruct)
	if err != nil {
		return ctx.NoContent(http.StatusBadRequest)
	}

	url := UrlStruct.Url

	if !validUrl(url) {
		return ctx.NoContent(http.StatusBadRequest)
	}

	code, err := gonanoid.New()

	// Todo: make this error handling better
	if err != nil {
		return err
	}

	s.Lock.Lock()
	defer s.Lock.Unlock()

	s.Urls[code] = url

	return ctx.JSON(http.StatusOK, &models.ShortenCode{
		Code: code,
	})
}

func validUrl(url string) bool {
	return url != ""
}
