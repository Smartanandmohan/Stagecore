# StageCore Esports Platform

> **A premium Esports Tournament Platform** — built with React + Vite + Tailwind CSS frontend and a Java 21 + Spring Boot 3 + MySQL backend.

---

## 📁 Project Structure

```
esports-platform/
├── backend/              # Spring Boot REST API (Java 21)
│   ├── pom.xml
│   └── src/main/java/com/esports/
│       ├── config/       # SecurityConfig, DatabaseSeeder
│       ├── controller/   # Auth, Tournament, Match, Ranking, News
│       ├── dto/          # LoginRequest, RegisterRequest, AuthResponse, RegistrationRequest
│       ├── entity/       # User, Tournament, Match, TeamRank, PlayerRank, NewsArticle, Registration
│       ├── repository/   # JPA Repositories
│       ├── security/     # JwtTokenProvider, JwtAuthenticationFilter
│       └── service/      # AuthService, TournamentService
│
└── frontend/             # React + Vite + Tailwind CSS + Framer Motion
    └── src/
        ├── assets/images/  # AI-generated tournament artwork
        ├── components/     # Navbar, Hero, TournamentCard, MatchCard, RankingCard, SponsorSection, Footer
        ├── context/        # AuthContext (JWT token management)
        └── pages/          # Home, Login, Register
```

---

## 🖥️ Frontend Setup

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation & Run

```bash
cd esports-platform/frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

---

## 🖧 Backend Setup

### Prerequisites
- Java 21 (JDK)
- Apache Maven 3.9+
- MySQL 8.x running locally

### Database Setup

Create the MySQL database (the app will create tables automatically):

```sql
CREATE DATABASE esports_db;
```

Update credentials in `backend/src/main/resources/application.yml` if needed:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/esports_db
    username: root
    password: root  # Change to your MySQL password
```

### Installation & Run

```bash
cd esports-platform/backend
mvn spring-boot:run
```

> **Note:** If `mvn` is not installed globally, install Apache Maven first: https://maven.apache.org/download.cgi

The API will start at **http://localhost:8080**

### Pre-seeded Data

On first run, `DatabaseSeeder` automatically inserts:
- 2 sample users (`admin` / `admin`, `slayer` / `slayer`)
- 4 tournaments (Valorant, BGMI, Free Fire, CS2)
- 3 live/upcoming/completed matches
- Team & player rankings
- 3 news articles

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and get JWT token |
| `GET` | `/api/tournaments` | ❌ | List all tournaments |
| `POST` | `/api/tournaments/{id}/register` | ✅ JWT | Register a team for a tournament |
| `GET` | `/api/matches` | ❌ | List all matches |
| `GET` | `/api/rankings/teams` | ❌ | Team leaderboard |
| `GET` | `/api/rankings/players` | ❌ | MVP player leaderboard |
| `GET` | `/api/news` | ❌ | Latest news articles |

---

## 🎮 Features

- 🏆 **Tournament Management** — Valorant, BGMI, Free Fire, CS2 tournament cards with Register button
- 📡 **Live Match Scores** — Real-time status with Watch Live stream links
- 🥇 **Team & Player Rankings** — Leaderboards with gold/silver/bronze rank badges
- 📰 **News & Updates** — Event announcements and articles
- 🎪 **Sponsors Section** — Partnership information
- 🔐 **JWT Auth** — Secure login/register modals with token persistence
- 📱 **Fully Responsive** — Mobile-first design
- ✨ **Glassmorphism + Neon Effects** — Premium dark gaming aesthetics
- 🎞️ **Framer Motion Animations** — Smooth entrance transitions

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#050816` |
| Neon Purple | `#7C3AED` |
| Neon Blue | `#06b6d4` |
| Font | Outfit, Inter |
| Style | Glassmorphism + Glow Effects |

---

## 📦 Tech Stack

**Frontend:** React 19, Vite 8, Tailwind CSS v4, Framer Motion, Lucide React, Axios, React Router DOM

**Backend:** Java 21, Spring Boot 3.3, Spring Security, Spring Data JPA, MySQL 8, jjwt (JWT), Lombok
