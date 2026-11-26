# Project Team Agreements

This document is our shared reference for coordinating the work among the three team members. If we change a name, path, or responsibility, we will update this file so everyone is working from the same agreement.

## Goal

Build a page with a demo login. After signing in, users see a dashboard where they can choose which application to use:

1. Add two numbers.
2. Use a basic calculator.
3. Call an API and display its response.

The interface will use React and Tailwind CSS. The hardcoded password is for demonstration only and must not be used in production.

## Work assignments

### Person 1 — Login and dashboard

- Implement the login form and demo session state.
- Implement the dashboard, its navigation options, and application selection.
- Integrate the components delivered by persons 2 and 3 into the dashboard.
- Files owned:
  - `apps/web/src/App.jsx`
  - `apps/web/src/components/Login.jsx`
  - `apps/web/src/components/Dashboard.jsx`

### Person 2 — Addition and calculator

- Implement addition with two number inputs, a calculate button, and a result.
- Implement the calculator with digits, addition, subtraction, multiplication, division, clear, and equals.
- Keep both components independent from the login and dashboard.
- Files owned:
  - `apps/web/src/components/Suma.jsx`
  - `apps/web/src/components/Calculadora.jsx`

### Person 3 — API

- Implement a small API for the demo.
- Implement the web component that requests the response and displays the result or an error.
- Document how to start the API and run it alongside the web app.
- Suggested files:
  - `apps/api/` for the API.
  - `apps/web/src/components/PanelApi.jsx` for the API interface.
  - `apps/web/src/services/api.js` for the React request helper, if needed.

## Integration agreements

- Person 1 owns `App.jsx` and `Dashboard.jsx`; the other team members should not edit those files.
- Each application component should use a default export so the dashboard can import it:
  - `Suma.jsx`
  - `Calculadora.jsx`
  - `PanelApi.jsx`
- Components built by persons 2 and 3 should not implement login or navigation; the dashboard decides which one to display.
- The dashboard should provide an option to return to the application selection and another to log out.
- Everyone will use React and Tailwind CSS and keep styling consistent with the agreed interface.
- Person 3 will confirm the API route and response format with the team before integration is complete. Initial proposal:
  - `GET /api/message`
  - Success response: `{ "message": "..." }`
- If the API is unavailable or returns an error, the component should show a clear message and must not imply the request succeeded.

## Git workflow

- Each person works on a separate branch with a descriptive name, for example:
  - `feature/login-dashboard`
  - `feature/suma-calculadora`
  - `feature/api`
- Do not work directly on `main`.
- Before starting, update your branch with the latest changes from `main`.
- Push changes in small, descriptive commits and propose merging them into `main` through a pull request.
- Person 1 integrates the components through imports when they are available; coordinate changes through pull requests rather than copying code between branches.
- If two tasks need to edit the same file, discuss it first and agree on who will make the change to avoid conflicts.

## Checks before integration

- The login accepts the demo credentials agreed upon by the team and rejects other credentials.
- Each application can be opened from the dashboard, and users can return to the selection screen.
- Addition and all four basic calculator operations produce the expected result.
- The API displays its response when available and a clear error when it is not.
- The page is usable on a small screen.
