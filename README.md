# Tesseract - 4D Hypercube Visualization

A Three.js visualization of a tesseract (4D hypercube) with two rotating cubes in opposite directions.

![Tesseract Visualization](Screenshot%202025-12-04%20162039.png)

## Features

- Interactive 3D tesseract visualization
- Outer cube (cyan) rotating clockwise
- Inner cube (magenta) rotating counter-clockwise
- Solid cylindrical pillars for edges
- Top tilted camera view
- Smooth pink gradient background

## Technologies

- Three.js (loaded via CDN)
- Vanilla JavaScript (ES6 modules)
- HTML5 Canvas

## Getting Started

### Prerequisites

- A modern web browser with ES6 module support
- A local HTTP server (required for ES modules)

### Running the Project

1. Clone the repository:
```bash
git clone <repository-url>
cd Tesseract
```

2. Start a local server. You can use any of the following methods:

**Using Node.js (npx):**
```bash
npx --yes serve .
```

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Open your browser and navigate to the server URL (typically `http://localhost:3000` or `http://localhost:8000`)

4. The tesseract visualization should now be visible and rotating

## Project Structure

```
Tesseract/
├── index.html                          # Main HTML file
├── tesseract.js                        # Three.js visualization code
├── Screenshot 2025-12-04 162039.png   # Project screenshot
├── .gitignore                          # Git ignore file
└── README.md                            # This file
```

## How It Works

The tesseract is visualized as two 3D cubes:
- An outer cube representing one "face" of the 4D hypercube
- An inner cube representing the opposite "face"
- Each cube is constructed using cylindrical pillars for edges
- Both cubes rotate horizontally in opposite directions to create the 4D effect

## Customization

You can modify the following in `tesseract.js`:
- Rotation speed: Adjust the values in the `animate()` function (currently `0.005`)
- Pillar thickness: Change `outerRadius` and `innerRadius` values
- Colors: Modify the material colors (cyan `0x00ffff`, magenta `0xff00ff`)
- Camera position: Adjust `camera.position.set()` values
- Cube size: Change the `size` variable