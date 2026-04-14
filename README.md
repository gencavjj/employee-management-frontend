# Employee Management Frontend

Angular 21 single-page app that talks to the Employee-Management-Backend REST API. Supports listing, creating, viewing, and deleting employees.

## Prerequisites

- **Node.js** `^20.19` or `^22.12` (the Angular 21 toolchain does not support older minors).
- **npm** `>=10`.
- The companion Employee-Management-Backend running on `http://localhost:8080` — the frontend calls `http://localhost:8080/api/employees` (see `src/app/employee-service/employee.service.ts`). You can still start the frontend without it; list/detail views will just log a connection error.

## Install

```bash
cd employee-management-frontend
npm install
```

A first install pulls ~825 packages and should report **0 vulnerabilities**:

```bash
npm audit
```

## Start the dev server

```bash
npm start
# equivalent to: npx ng serve
```

Then open **http://localhost:4200/**. The dev server watches source files and reloads automatically.

Common flags:

```bash
npm start -- --host 0.0.0.0          # expose on the LAN
npm start -- --port 4300             # use a different port
npm start -- --open                  # open the default browser
```

## Production build

```bash
npm run build
```

Artifacts are emitted to `dist/Employee-Management-Frontend/`. Serve the contents with any static host (nginx, `npx http-server`, S3 + CloudFront, etc.). The default production configuration enables hashing, license extraction, and a 5 MB initial-bundle budget.

To preview a production build locally:

```bash
npm run build
npx http-server dist/Employee-Management-Frontend -p 4200
```

## Configuration

The backend base URL lives in `src/app/employee-service/employee.service.ts` (`baseUrl`). Update it there, or lift it to `src/environments/environment.ts` / `environment.prod.ts` if you need per-environment values — the production file swap is already wired up in `angular.json` under `configurations.production.fileReplacements`.

## Project layout

```
src/
├── app/
│   ├── app.module.ts              # Root NgModule (bootstraps AppComponent)
│   ├── app-routing.module.ts      # Routes: /employees, /add, /details/:id
│   ├── app.component.*            # Shell with navigation + <router-outlet>
│   ├── employee-list/             # Lists all employees
│   ├── employee-details/          # Single-employee view
│   ├── create-employee/           # Create form
│   ├── employee-service/          # HttpClient wrapper around the REST API
│   └── employee-model/            # `Employee` class
├── environments/                  # Dev / prod environment flags
├── index.html                     # Loads Bootstrap 4 via CDN
├── main.ts                        # platformBrowserDynamic().bootstrapModule
└── styles.css                     # Global styles
```

## Troubleshooting

- **`Cannot find module '@angular/...'`** — run `npm install` again; the Angular 21 upgrade requires a fresh `node_modules`.
- **Blank page / network errors in the console** — the backend is not running on `:8080`. Start it, or point `baseUrl` at wherever it lives.
- **Port 4200 already in use** — another dev server is running. Kill it or use `npm start -- --port 4300`.
- **Engine warning about Node version** — you are on an unsupported Node minor (< 20.19 or < 22.12). Upgrade Node.
