# Mediterranean Cruise 2016 Memorial

A modernized React + Vite version of the original ASP.NET MVC Mediterranean cruise countdown from 2016. This memorial captures the excitement and anticipation leading up to the September 15, 2016 cruise departure.

## Features

- ⏱️ **Time Since Counter**: Live countdown showing days, hours, minutes, and seconds since the cruise
- 🚢 **Animated Cruise Ship**: Trigonometric flight path animation across the screen
- 🌊 **Interactive Wave Animation**: HTML5 Canvas water physics with bubbles
- 📹 **Embedded Memory Video**: YouTube video of cruise memories
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🐳 **Dockerized**: Easy deployment with Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Port 8081 available (or modify docker-compose.yml)

### Quick Start

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Access the app:**
   Open your browser to [http://localhost:8081](http://localhost:8081)

3. **Stop the app:**
   ```bash
   docker-compose down
   ```

### Alternative: Build and run with Docker directly

```bash
# Build the image
docker build -t cruise-memorial:latest .

# Run the container
docker run -d -p 8081:80 --name cruisememory cruise-memorial:latest

# Stop the container
docker stop cruisememory
docker rm cruisememory
```

## Development

### Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Technical Stack

- **Frontend**: React 19 + Vite
- **Styling**: Custom CSS (preserved from original)
- **Animation**: Pure JavaScript (no jQuery!)
- **Canvas**: HTML5 Canvas for wave physics
- **Server**: nginx (Alpine)
- **Container**: Docker multi-stage build

## Project Structure

```
cruise-memorial/
├── public/
│   ├── images/           # Original cruise images
│   ├── css/              # Site.css (path-fixed)
│   ├── wave.js           # Original wave physics
│   └── favicon.svg       # Ship emoji favicon
├── src/
│   ├── components/
│   │   ├── CountdownClock.jsx       # Time since counter
│   │   ├── CruiseShipAnimation.jsx  # Animated ship
│   │   ├── WaveAnimation.jsx        # Canvas waves
│   │   └── YouTubePlayer.jsx        # Embedded video
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions CI/CD
└── README.md
```

## Original App (2016)

This memorial is a modernized recreation of the ASP.NET MVC application originally built as a countdown to the Mediterranean cruise departure on September 15, 2016. The original featured:

- Countdown clock to cruise departure (12:30 PM)
- Animated airplane/ship flying across the screen
- Trigonometric flight path calculations
- Wave.js interactive water animation
- Beautiful Mediterranean-themed background

## Deployment

### GitHub Actions

The project includes automated deployment via GitHub Actions:

- **Trigger**: Push to `master` or `main` branch
- **Runner**: Self-hosted
- **Process**:
  1. Builds Docker image
  2. Stops old container
  3. Runs new container on `app-network`
  4. Cleans up old images

### Configuration

| Setting | Value |
|---------|-------|
| **Container Name** | cruisememory |
| **Image Tag** | cruisememory:latest |
| **Port** | 8081:80 |
| **Network** | app-network |
| **Restart Policy** | unless-stopped |

## Features Deep Dive

### Countdown Clock
- Shows elapsed time since September 15, 2016 at 12:30 PM
- Updates every second
- Responsive design for mobile
- Memorial text: "Time Since Our Mediterranean Adventure"

### Cruise Ship Animation
- Ported from original LoadingPage1.1.js
- Complex trigonometric calculations for flight paths
- Random position generation
- Smooth transitions and rotations
- Ship flips when moving right-to-left

### Wave Animation
- Ported from original wave.js (jQuery removed!)
- HTML5 Canvas physics simulation
- Interactive mouse movement
- Rising bubbles with realistic physics
- Water density and air density calculations
- Random impulses to keep waves moving

### YouTube Video
- Embedded cruise memory video
- Centered positioning
- Responsive 16:9 aspect ratio
- Elegant styling with shadows and borders

## License

Personal memorial project - not for commercial use.

## Acknowledgments

Made with ❤️ in memory of our Mediterranean Adventure, September 2016

---

🚢 Bon Voyage! ⛵
