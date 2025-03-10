import os
import sys

# Add the prueba directory to the path so we can import from it
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import your application
from prueba.web_app import app

if __name__ == "__main__":
    # Get port from environment variable
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
