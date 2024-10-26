FROM mongodb/mongodb-atlas-local

ENV DB_DST=mongodb://development:messwithbestdieliketherest@mongo:27017/

FROM golang:1.23.1-alpine as builder

WORKDIR /be

RUN apk --no-cache add bash git make gcc gettext musl-dev

COPY ["./be/go.mod", "./be/go.sum", "./be/"]
RUN  go mod download

COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -mod=vendor -o . ./be/cmd/main.go

EXPOSE 8080

CMD ["./app"]