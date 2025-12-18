# GEMINI.md

## Project Overview

This is a React application that serves as a Marvel Cinematic Universe (MCU) tracker. It allows users to browse through MCU movies and TV shows, view their release dates, and other details. The application is built with Vite, TypeScript, and React.

The main technologies used are:

*   **React:** For building the user interface.
*   **Vite:** As the build tool and development server.
*   **TypeScript:** For static typing.
*   **React Query:** For data fetching and state management.
*   **Axios:** For making HTTP requests to the MCU API.
*   **Styled-components:** For styling the application.
*   **i18next:** For internationalization.

The application fetches data from the MCU API at `https://mcuapi.herokuapp.com/api/v1`.

## Building and Running

### Prerequisites

*   Node.js and npm (or yarn/pnpm)

### Installation

To install the project dependencies, run:

```bash
npm install
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

The production-ready files will be located in the `dist` directory.

### Linting

To lint the codebase, run:

```bash
npm run lint
```

## Development Conventions

*   **Styling:** The project uses `styled-components` for styling. Global styles can be found in `src/GlobalStyles.ts`.
*   **Data Fetching:** Data fetching is handled by `react-query`. A custom hook, `useMCUApi`, is used to fetch data from the MCU API.
*   **Translations:** The project uses `react-i18next` for translations. Translation files are located in the `src/locales` directory.
*   **Components:** Reusable components are located in the `src/components` directory.
*   **Fonts:** Custom fonts are located in `src/assets/fonts`.
