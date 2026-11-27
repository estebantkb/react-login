# Team Agreements

This document is the shared source of truth for the three-person team. Update it together if the scope, file ownership, or integration contract changes.

## Project goal

Build a React web app with a demo login. After signing in, users see a dashboard where they can choose one of three applications:

1. Add two numbers.
2. Use a basic calculator.
3. Request data from an API and display the response.

The web app uses React, TypeScript, and Tailwind CSS. The API is a separate app in this npm-workspaces monorepo. The hardcoded login is for demonstration only, not production authentication.

## Work ownership

### Person 1 — Login and dashboard

- Implement the login form and demo sign-in/sign-out state.
- Implement the dashboard application selector and navigation between the selector and selected app.
- Integrate the addition, calculator, and API UI modules without taking over their implementation.
- Own these paths:
  - `apps/web/src/app/`
  - `apps/web/src/modules/auth/`
  - `apps/web/src/pages/`

### Person 2 — Addition and calculator

- Implement addition with two numeric inputs, a calculate action, and a visible result.
- Implement a calculator with digits, addition, subtraction, multiplication, division, clear/delete, and equals.
- Keep both tools independent of login and dashboard navigation.
- Own these paths:
  - `apps/web/src/modules/addition/`
  - `apps/web/src/modules/calculator/`

### Person 3 — API

- Implement the API in `apps/api/`.
- Implement the web UI and request helper that call the API and show the response or a clear error.
- Own these paths:
  - `apps/api/`
  - `apps/web/src/modules/api/`

## Integration contract

- The dashboard owns application selection. Individual tools must not implement login or dashboard navigation.
- Each tool exposes a typed React component that the dashboard can render. Agree on the component export name and props before integration.
- Initial API proposal:
  - `GET /api/message`
  - Success response: `{ "message": "..." }`
- The API owner confirms the final route, response shape, and local startup instructions with the team.
- Show loading and error states for API requests; do not show a success message when a request fails.
- Use `apps/web/src/components/ui/` only for UI shared by multiple modules. Put shared styles in `apps/web/src/styles/`; keep module-specific code inside its module.
- Use `.ts` for TypeScript files and `.tsx` for React components.
- The demo credentials should be agreed by the team and clearly labeled as demo-only. Proposed values: username `admin`, password `1234`.

## Git workflow

- Use `init/boilertemplate` as the shared setup branch and create a separate branch for each task, for example:
  - `feature/login-dashboard`
  - `feature/addition-calculator`
  - `feature/api`
- Do not commit directly to `main`.
- Keep file ownership boundaries above to reduce merge conflicts. Discuss shared-file changes before making them.
- Push each branch and use a pull request to integrate it into the agreed base branch.
- Use small, descriptive commits and run the available build and lint checks before requesting review.

## Completion checklist

- Valid demo credentials open the dashboard; invalid credentials show a clear error.
- The dashboard can open each application and return to the application selector.
- Addition and all four calculator operations produce correct results.
- The API UI displays returned data and handles loading and failure states.
- The interface remains usable on a small screen.
