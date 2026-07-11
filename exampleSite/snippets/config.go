package snippets

import "os"

// LoadPort reads the optional HTTP port and falls back to the local default.
func LoadPort() string {
	if port := os.Getenv("PORT"); port != "" {
		return port
	}

	return "1313"
}
