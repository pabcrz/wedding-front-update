# Wedding Management System

A full-stack web application for managing wedding guest lists, RSVPs, and event information. Built with modern web technologies for a seamless user experience.

## 🎯 Overview

This application provides a comprehensive solution for wedding event management, featuring:

- **Guest Management**: Full CRUD operations for guest information
- **RSVP System**: Allow guests to confirm attendance online
- **Interactive Analytics**: Visual charts showing guest statistics by category
- **Advanced Filtering**: Filter guests by attendance status and demographic categories
- **Real-time Updates**: Live data synchronization across components

## 🛠️ Tech Stack

### Frontend
- **Astro** - Modern static site generator
- **React** - UI components and state management
- **Tailwind CSS** - Utility-first styling
- **ECharts** - Interactive data visualization
- **Sonner** - Toast notifications

### Backend Integration
- RESTful API integration with external backend
- Real-time data fetching and updates

## 📁 Project Structure

```
wedding-front-update/
├── src/
│   ├── components/          # React & Astro components
│   │   ├── AdminPanel.jsx   # Main admin dashboard
│   │   ├── Chart.jsx        # Interactive pie chart
│   │   ├── GuestInfo.jsx    # Guest statistics & filtering
│   │   ├── Guests.jsx       # Guest search & RSVP
│   │   └── ...
│   ├── context/             # React Context providers
│   │   ├── GuestFilters.jsx # Global category filter state
│   │   └── RefreshGuests.jsx # Data refresh coordination
│   ├── lib/                 # Utility functions
│   │   ├── filterGuest.js   # Guest filtering logic
│   │   └── normalizeText.js # Text normalization
│   ├── pages/               # Astro pages (routes)
│   │   ├── index.astro      # Landing page
│   │   ├── admin.astro      # Admin dashboard
│   │   └── confirmar-asistencia.astro # RSVP page
│   └── styles/              # Global styles
└── public/                  # Static assets
```

## ✨ Key Features

### 1. Guest Search & RSVP
- Minimum 3-character search for quick guest lookup
- Name normalization for accent-insensitive search
- Modal-based RSVP confirmation flow

### 2. Admin Dashboard
- Comprehensive guest list management
- Add, edit, and delete guest records
- Filter by attendance status (confirmed, declined, pending)
- Category-based filtering (men, women, boys, girls)

### 3. Interactive Analytics
- Realpie chart visualization
- Click-to-filter functionality on chart segments
- Automatic hiding of empty categories
- Dynamic statistics display

### 4. Advanced Filtering System
- Global context-based state management
- Combined filters (attendance + category)
- Disabled options for empty categories
- Auto-reset on filter changes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd wedding-front-update

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:4321`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### API Endpoint
Update the API URL in `src/pages/api/data.js`:

```javascript
const API_URL = "your-backend-url";
```

### Tailwind Configuration
Customize theme in `tailwind.config.mjs`

## 📊 Technical Highlights

### State Management
- React Context API for global state
- Component-level state for UI interactions
- Efficient re-rendering with proper dependency arrays

### Performance Optimizations
- Lazy loading with `client:only` directive
- Filtered data rendering to minimize DOM updates
- Memoized filter functions

### Code Quality
- Modular component architecture
- Separation of concerns (UI, logic, data)
- Reusable utility functions
- Clear naming conventions

## 🎨 UI/UX Features

- Responsive design for mobile and desktop
- Toast notifications for user feedback
- Loading states for async operations
- Disabled states for unavailable options
- Visual indicators for filtered data
- Consistent color scheme (red theme)

## 📝 API Integration

The application integrates with a backend API providing:

- `GET /guests` - Fetch all guests
- `POST /guests` - Create new guest
- `PATCH /guests/:id` - Update guest information
- `DELETE /guests/:id` - Remove guest

## 📄 License

This project is private and intended for personal use.

## 👤 Author

Pablo Cruz

---

**Note**: This is a frontend application that requires a separate backend API for full functionality.
