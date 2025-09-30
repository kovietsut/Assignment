# MSW (Mock Service Worker) Setup

This project uses MSW to mock API endpoints for development and testing.

## Setup

1. **Installation**: MSW is installed as a dev dependency

   ```bash
   npm install msw --save-dev
   ```

2. **Mock Handlers**: Located in `src/mocks/handlers.ts`

   - `/api/schedules` - GET with pagination and filtering
   - `/api/schedules/:id` - GET single schedule
   - `/api/schedules` - POST new schedule

3. **Browser Setup**: Located in `src/mocks/browser.ts`

   - Starts MSW worker in development mode

4. **Main Integration**: Updated `src/main.tsx` to start MSW in development

## API Endpoints

### GET /api/schedules

Returns paginated schedules with optional filtering.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `filter` (string): Filter by meal type (Morning, Lunch, Dinner, Snack)

**Response:**

```json
{
  "schedules": [
    {
      "id": 1,
      "imageUrl": "/src/assets/d01.svg",
      "time": "05.21.Morning",
      "mealType": "Morning",
      "date": "2024-01-15"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### GET /api/schedules/:id

Returns a single schedule by ID.

### POST /api/schedules

Creates a new schedule.

## Components

### FilterButtons

- Renders filter buttons for Morning, Lunch, Dinner, Snack
- Handles filter state and loading states
- Located in `src/pages/top/filter_buttons/`

### ScheduleList

- Renders paginated schedule grid
- Includes pagination controls with ChevUp/ChevDown icons
- Handles loading, error, and empty states
- Located in `src/pages/top/schedule_list/`

### PaginationButton

- Reusable pagination button with icon
- Supports up/down directions
- Located in `src/pages/top/pagination_button/`

## Hooks

### useSchedules

Custom hook for managing schedule state:

- Fetches schedules with pagination
- Handles filtering by meal type
- Manages loading and error states
- Provides pagination controls

## Features

1. **Pagination**: 20 schedules per page with next/previous navigation
2. **Filtering**: Filter by meal type (Morning, Lunch, Dinner, Snack)
3. **Loading States**: Visual feedback during API calls
4. **Error Handling**: Displays error messages when API calls fail
5. **Responsive Design**: Grid layout adapts to different screen sizes

## Usage

The implementation automatically loads 20 schedules on page load. Users can:

- Click filter buttons to filter by meal type
- Use pagination buttons to navigate between pages
- See loading states during API calls
- View pagination information (current page, total pages)

## Development

To modify the mock data or add new endpoints:

1. Edit `src/mocks/handlers.ts`
2. Add new handlers or modify existing ones
3. The changes will be reflected immediately in development
