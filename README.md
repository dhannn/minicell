# MiniCell
MiniCell is a minimal interface for an ECA simulator.

Since MiniCell is designed to be a minimal interface, we simply use vanilla HTML,
CSS and JavaScript for the application. Thus, anyone with the source code can 
simply run in their browser by clicking `index.html` as the entry point. 
**No installations or library management required!**

The application is also available at <link>.

# How to Use

1. Run the `index.html` file in your browser or go to <link>
2. 

```JSON
    "definition": {
        "states": ["0", "1"],
        "ruleset": {
            "000": "0",
            "001": "0",
            "010": "0",
            "011": "0",
            "100": "1",
            "101": "1",
            "110": "0",
            "111": "1"
        },
        "initialConfig": "00000000100000000"
    },
    "display": {
        "states": {
            "0": "#1D3354",
            "1": "#9ED8DB"
        }
    }
```
