FROM golang:1.22.2-alpine AS builder
WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ .
RUN go test -v ./...
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /app/main .


FROM scratch
WORKDIR /
COPY --from=builder /app/main /main
EXPOSE 8080
ENTRYPOINT ["/main"]
