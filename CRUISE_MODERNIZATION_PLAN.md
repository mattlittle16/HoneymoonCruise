# CruiseMemory Modernization Plan

## Project Goal
Modernize the legacy ASP.NET MVC CruiseMemory application (Mediterranean cruise countdown, Sept 15, 2016) to a modern React + Vite + Docker stack, similar to the VDay2015 → vday-memorial conversion.

## Current Status
**Phase**: Planning & Setup
**Last Action**: Attempting to create React + Vite project structure
**Blocker**: npm create vite command failing with exit code 1

## Lessons Learned from VDay2015 Project
1. ✅ Study the original blueprint thoroughly before implementation
2. ✅ Separate background systems (don't confuse different visual contexts)
3. ✅ Fix CSS paths for production builds (`../Images/` → `/images/`)
4. ✅ Set proper z-index values (avoid -1, use positioned elements)
5. ✅ Don't override `position` with `!important` - breaks layouts
6. ✅ Use consistent asset references (no morphing planes/images)

## Key Features to Preserve from Original App

### Core Functionality
- [x] **Analyzed** - Countdown clock to Sept 15, 2016 departure (FlipClock.js)
- [x] **Analyzed** - Airplane animation with trigonometric flight paths
- [x] **Analyzed** - Route map background (Barcelona → Naples)
- [x] **Analyzed** - Clue system (5 clues, session-based progression)
- [x] **Analyzed** - Wave.js interactive water animation (HTML5 Canvas)

### Memorial Enhancement
- [ ] Start at "beginning" state (like VDay2015 Feb 6 equivalent)
- [ ] Make countdown show "time since" instead of "time until"?
- [ ] Keep all visual elements as memorial/exploration mode
- [ ] Handle missing clue view files appropriately

## Technical Architecture

### Stack
- **Frontend**: React 18 + Vite
- **Styling**: Original CSS (ported from ASP.NET MVC)
- **Container**: Docker multi-stage build (node:20-alpine → nginx:alpine)
- **Server**: nginx for static assets

### Project Structure
```
cruise-memorial/
├── src/
│   ├── components/
│   │   ├── PlaneAnimation.jsx       # Trigonometric flight animation
│   │   ├── WaveAnimation.jsx        # Canvas-based water waves (Wave.js port)
│   │   ├── CountdownClock.jsx       # FlipClock replacement
│   │   └── ClueView.jsx             # Clue display with auto-fill
│   ├── data/
│   │   └── clues.js                 # 5 clues data
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # Component styles + z-index fixes
│   └── main.jsx                     # React entry point
├── public/
│   ├── css/
│   │   └── Site.css                 # Ported original styles (path fixes)
│   └── images/                      # All visual assets from original
├── Dockerfile                       # Multi-stage build
├── docker-compose.yml               # Service definition
├── nginx.conf                       # Static serving config
└── package.json                     # Dependencies

```

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### Assets to Copy
From `/CruiseMemory/Content/`:
- Images/bg.jpg (route map background)
- Images/plane-up.png
- Images/ship-up.png
- All clue background images (if they exist)

From `/CruiseMemory/Content/`:
- Css/Site.css → public/css/Site.css
  - Fix paths: `url(../Images/` → `url(/images/`
  - Fix z-index: `-1` → `1`

From `/CruiseMemory/Content/Scripts/`:
- LoadingPage.js logic → components/PlaneAnimation.jsx
- Wave.js logic → components/WaveAnimation.jsx (optional)

## Implementation Steps

### Phase 1: Project Setup
- [ ] Create cruise-memorial directory structure
- [ ] Initialize package.json with React + Vite
- [ ] Set up Dockerfile and docker-compose.yml
- [ ] Create nginx.conf

### Phase 2: Asset Migration
- [ ] Copy all images from CruiseMemory/Content/Images → public/images/
- [ ] Copy and fix Site.css (path fixes, z-index fixes)
- [ ] Verify all assets load correctly

### Phase 3: Core Components
- [ ] Create App.jsx with main layout
- [ ] Port PlaneAnimation.jsx (from LoadingPage.js)
- [ ] Create CountdownClock.jsx (FlipClock replacement or similar)
- [ ] Optional: Port WaveAnimation.jsx (from Wave.js)
- [ ] Create ClueView.jsx with auto-fill/skip functionality

### Phase 4: Data & State
- [ ] Extract clues from HomeController.cs → data/clues.js
- [ ] Implement localStorage for progress tracking
- [ ] Set up clue navigation (Previous/Next)

### Phase 5: Testing & Refinement
- [ ] Test all animations (plane, waves if included)
- [ ] Verify z-index stacking (backgrounds behind content)
- [ ] Test clue progression and auto-fill
- [ ] Verify responsive breakpoints (648px, 1340px)
- [ ] Build Docker image and test deployment

## Missing Components in Original App
- **Clue1.cshtml through Clue5.cshtml**: View files don't exist
- **Clue background images**: May not exist, need to verify
- **Action**: Check if clue system should be included or omitted

## Questions for User
1. Should we include the clue system even though view files are missing?
2. Should countdown show "time since" cruise (memorial mode) or keep original "time until"?
3. Should we port the Wave.js water animation or simplify?
4. Any other memorial enhancements desired?

## Next Actions
1. Resolve npm create vite issue (try manual setup or different approach)
2. Get user input on questions above
3. Proceed with Phase 1: Project Setup
