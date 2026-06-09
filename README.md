# PictwoChat_Frontend
<img src="public/PictwoChat Banner.png" alt="PictwoChat Banner"/>

A small chatting app inspired by Nintendo DS Pictochat.

## Setup
### Prerequisites
- Node.js (recommended 24+)
- MongoDB instance (Atlas for example)
- Giphy API Key

### .env
Copy the `.env.example` file, rename it to `.env`, and add the required keys.

### Running
1. Run `npm install` to install dependencies.
2. Run `npm run dev` to run a local instance.

_Make sure that the backend is also running._

## Testing
Tests are ran using the Playwright library and can be found in the `./e2e` folder.  
If you'd like to tweak the configuration (add more browsers, ...), check the `./playwright.config.ts` file.

## Hierarchy
```py
📁 <root>
├── 📁 e2e                  # Playwright test files 
├── 📁 public               # Public ressources (such as the favicon) 
├── 📁 src                  
│   ├── 📄 App.tsx          # Main entry point of the app
│   ├── 📄 theme.ts         # Theme configuration shared across the app (colors, ...)
│   ├── 📁 components       # Components that are reused in multiple pages.
│   ├── 📁 graphql          # GraphQL queries/mutations
│   ├── 📁 lib              # Libraries configurations (Apollo Client, ...)
│   └── 📁 pages            # Pages of the app
├── 📄 playwright.config.ts # Configuration file for e2e tests
└── 📄 README.md            # The file you are literally looking at right now.
```