# Workshop Booking UI/UX Enhancement

This repository contains my UI/UX redesign of the FOSSEE Workshop Booking portal using React for the frontend while keeping the original Django backend structure available for data and workflow context.

The redesign focused on:
- improving the mobile experience first
- making navigation clearer and more task-focused
- aligning the login and post-login areas into one consistent visual system
- connecting the React dashboard to backend data instead of showing only placeholder content

## What I Changed

### Frontend
- redesigned the login flow with a stronger mobile-first layout
- added responsive routing for:
  - `Dashboard`
  - `Workshop List`
  - `Workshop Types`
  - `Statistics`
  - `My Profile`
- added a desktop sidebar and mobile bottom navigation
- introduced route-based lazy loading to reduce the initial frontend bundle
- improved hierarchy, spacing, and readability across screens

### Backend integration
- added a lightweight Django JSON endpoint for dashboard data
- used actual backend workshop/workshop-type data when available
- added a fallback based on real workshop resource folders in the repo when the database is empty

## Design Reasoning

### 1. What design principles guided the improvements?

The redesign was guided by a few simple principles:

- mobile-first clarity:
  Most users are expected to access the portal on smaller screens, so forms, navigation, and content blocks were simplified for mobile first and then expanded for larger screens.

- visual hierarchy:
  The previous experience was functional but visually flat. I introduced clearer headings, section separation, and stronger primary actions so users can understand what matters first.

- consistency:
  The login page and dashboard originally felt like different products. I aligned colors, spacing, surfaces, and interaction patterns so the experience feels like one portal.

- grounded interface decisions:
  I avoided adding random product features and instead tried to keep the UI close to the workshop-booking domain: workshops, workshop types, statistics, and user profile.

### 2. How did you ensure responsiveness across devices?

- used a mobile-first layout on the login page
- created a centered mobile card instead of a split-screen layout on phones
- preserved the larger split-panel experience for tablet and desktop
- replaced the desktop sidebar with a bottom navigation pattern on mobile
- used flexible grids like `repeat(auto-fit, minmax(...))` for dashboard cards and content areas
- tested layout logic using viewport width checks and responsive spacing

### 3. What trade-offs did you make between design and performance?

- I kept animation subtle and limited to places where it improves feedback instead of decorating every section
- I used lazy loading for route pages to reduce the initial bundle size
- I kept some charting with `recharts` because it improves readability, but it still contributes a noticeable chunk size in the production build
- I avoided very heavy visual effects or image-heavy sections to keep the pages fast

### 4. What was the most challenging part of the task and how did you approach it?

The most challenging part was bridging a modern React UI with a legacy Django codebase that did not already expose a frontend-friendly API for the redesigned dashboard.

To handle that:
- I first inspected the Django models and existing database
- I created a small API endpoint only for the dashboard use case
- I kept the API simple and reusable
- because the local database did not contain workshop rows, I added a fallback using real project resource folders so the UI still reflects the actual project context

Another challenge was avoiding a generic “template dashboard” look. I refined labels and section wording so the result feels more like a real workshop portal than a generic SaaS admin UI.

## Setup Instructions

## Backend

1. Create and activate a virtual environment
2. Install Python dependencies
3. Run migrations
4. Start the Django server

Example:

```powershell
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

If you already have the included local virtualenv configured, you can also use:

```powershell
venv\Scripts\python.exe manage.py runserver
```

## Frontend

From the `frontend` directory:

```powershell
npm install
npm run dev
```

The Vite development server should start on:

```text
http://localhost:5173
```

The frontend is configured to proxy `/workshop/*` requests to the Django backend running on `http://127.0.0.1:8000`.

## Build Check

Frontend production build:

```powershell
cd frontend
npm run build
```

Backend verification:

```powershell
venv\Scripts\python.exe manage.py check
```

## Screenshots

### Before
![Before Login](./frontend/public/Before%20Login.png)
![Before Dashboard](./frontend/public/Before%20Dashboard%201.png)
![Before Dashboard](./frontend/public/Before%20Dashboard%202.png)

### After
![After Login](./frontend/public/After%20Login.png)
![After Dashboard](./frontend/public/After%20Dashboard.png)
![Mobile Login](./frontend/public/Mobile%20Login.png)
![Mobile Dashboard](./frontend/public/Mobile%20Dashboard.png)

## Notes

- The dashboard currently uses backend data when available.
- In the current local database, workshop rows may be empty. In that case, the dashboard falls back to real workshop resource folders bundled in the repository so the UI still reflects actual project content.
- The remaining largest frontend bundle chunk comes mainly from charting code. Route-level code splitting has already been added to improve initial load performance.
