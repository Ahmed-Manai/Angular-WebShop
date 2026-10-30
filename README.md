# Angular WebShop

Angular 7 starter bundled with a hand-written webpack config, with routed Home / Login / Register pages and a fake authentication backend.

![Angular](https://img.shields.io/badge/Angular-7.2-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3.9-3178C6?logo=typescript&logoColor=white)
![webpack](https://img.shields.io/badge/webpack-4-8DD6F9?logo=webpack&logoColor=black)

## Features

- **Custom webpack 4 build** (no Angular CLI): `ts-loader` + `angular2-template-loader` for components, `raw-loader` for templates, `html-webpack-plugin` for `index.html`, and `webpack-dev-server` with `historyApiFallback` for client-side routing.
- **Routing** with `RouterModule.forRoot`: `/` (Home), `/login`, `/register`; unknown paths redirect to Home. The three pages are placeholders for now.
- **Bootstrap 4 navbar** (stylesheet loaded from a CDN in `index.html`).
- **Fake backend** (`src/app/_helpers/fake-backend.ts`): an `HttpInterceptor` registered in `AppModule` that answers `POST /users/authenticate` with a delayed (500 ms) response containing user details and a `fake-jwt-token`, or an error for wrong credentials. All other requests pass through. No component calls the API yet.
- **Global config object** injected at build time with `DefinePlugin` (`config.apiUrl = 'http://localhost:4000'`), typed in `src/typings.d.ts`.

## Tech stack

| Tool | Version (package.json) |
| --- | --- |
| Angular | ^7.2.16 |
| RxJS | ^6.6.7 |
| zone.js / core-js | ^0.11.8 / ^3.25.5 |
| TypeScript | ^3.9.10 |
| webpack / webpack-cli | ^4.46.0 / ^3.3.12 |
| webpack-dev-server | ^3.11.3 |

## Project structure

```text
.
├── webpack.config.js           # Loaders, HtmlWebpackPlugin, DefinePlugin (config.apiUrl), dev server
├── tsconfig.json
└── src/
    ├── index.html              # Bootstrap 4 CDN, <app> root element
    ├── main.ts                 # Bootstraps AppModule
    ├── polyfills.ts            # core-js reflect + zone.js
    ├── typings.d.ts            # Declares the global config object
    └── app/
        ├── app.module.ts       # Declares pages, registers fakeBackendProvider
        ├── app.routing.ts      # Routes: '', 'login', 'register', '**'
        ├── app.component.*     # Navbar + <router-outlet>
        ├── _helpers/           # FakeBackendInterceptor
        ├── home/
        ├── login/
        └── register/
```

## Getting started

### Prerequisites

- Node.js and npm. The project dates from the Node 10-14 era; with newer Node versions see the notes below.

### Install

```bash
npm ci
```

On npm 7+ the install stops with an `ERESOLVE` error, because `zone.js@^0.11.8` does not match the `zone.js@~0.8.26` peer range of Angular 7. Install with:

```bash
npm ci --legacy-peer-deps
```

### Run

```bash
npm start            # webpack-dev-server in development mode, opens the browser
```

On Node 17 or newer, webpack 4 fails with `ERR_OSSL_EVP_UNSUPPORTED`. Enable the legacy OpenSSL provider first:

```bash
# bash
NODE_OPTIONS=--openssl-legacy-provider npm start

# PowerShell
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm start
```

There is no build or test script yet.

### Demo credentials

The fake backend accepts username `test` and password `test`.

## Roadmap / ideas

- Login and registration forms wired to the fake backend through an authentication service
- Route guard for authenticated pages
- Product catalogue with pagination
- Production build script
