package main

import (
    "fmt"
    "log"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello, Go!")
}


func main() {
    http.HandleFunc("/", helloHandler)

    port := ":8080"
    fmt.Printf("Server starting on port %s\n", port)

    if err := http.ListenAndServe(port, nil); err != nil {
        log.Fatalf("Could not start server: %s\n", err)
    }
}
