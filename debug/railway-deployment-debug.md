# Railway Deployment Debug Log

## Date: 2026-02-12

---

## Error Analysis from Build Log

### The Actual Error
```
npm error code EBUSY
npm error syscall rmdir
npm error path /app/client/node_modules/.vite
npm error errno -16
npm error EBUSY: resource busy or locked, rmdir '/app/client/node_modules/.vite'
```

### Root Cause
The build command `cd server && npm ci && npm run build` is **redundant and conflicting** with Railpack's auto-detected install step.

**What Railpack does automatically:**
1. Detects monorepo with 3 workspaces
2. Runs `npm ci` at ROOT level (installs ALL workspaces including client)
3. Then runs your custom build command

**What the build command tried to do:**
1. `cd server` - OK
2. `npm ci` - FAILS because:
   - Root `npm ci` already installed everything
   - `client/node_modules/.vite` is locked/in-use
   - Server workspace shares the root lock file

### Secondary Issue: Node Version Mismatch
```
npm warn EBADENGINE Unsupported engine {
  package: 'vite@7.3.1',
  required: { node: '^20.19.0 || >=22.12.0' },
  current: { node: 'v20.18.0', npm: '10.8.2' }
}
```

The `.nvmrc` specifies `20.18.0` but `vite@7.3.1` requires `>=20.19.0`.

---

## What Was Tried

| Attempt | Configuration | Result |
|---------|--------------|--------|
| 1 | `railway.toml` + `nixpacks.toml` | Config file conflicts |
| 2 | `server/railway.json` with Nixpacks builder | "Expected string, received object" |
| 3 | Deleted config files, dashboard-only | "config file server/railway.json does not exist" |
| 4 | Cleared config file path, used Railpack | EBUSY error (this log) |

---

## Correct Fix

### 1. Update Node Version
Change `.nvmrc` from `20.18.0` to `20.19.0` (or `22.x` for LTS)

### 2. Fix Build Command
**WRONG:** `cd server && npm ci && npm run build`
- The `npm ci` is redundant - Railpack already runs it at root

**CORRECT:** `npm run build --workspace=server`
- OR: `cd server && npm run build` (no npm ci)

### 3. Railway Dashboard Settings
```
Builder:        RAILPACK
Root Directory: (empty)
Build Command:  npm run build --workspace=server
Start Command:  npm run start --workspace=server
```

---

## Monorepo Considerations

This is a **npm workspaces monorepo**:
```
family-health-app/
├── package.json        # Root with workspaces config
├── package-lock.json   # Single lock file for all
├── client/            # Workspace 1
├── server/            # Workspace 2
└── shared/            # Workspace 3
```

**Key insight:** In a monorepo, you should NOT run `npm ci` inside individual workspaces. The root `npm ci` handles everything.

---

## Fixes Applied (2026-02-12)

### 1. Updated Node Version
- `.nvmrc`: `20.18.0` → `20.19.0`
- `package.json` engines: `>=20.0.0` → `>=20.19.0`

### 2. Fixed start-railway.js
- ✅ Removed dependency on `tsx` (devDependency)
- ✅ Now uses compiled `dist/db/migrate.js` instead of `npm run db:migrate`
- ✅ Removed seeding step (not needed for production)
- ✅ Added graceful handling if migrations fail (tables already exist)

### 3. Railway Dashboard Settings (USER ACTION REQUIRED)
```
Builder:        RAILPACK
Root Directory: (empty)
Config Path:    (empty - CLEAR THIS FIELD!)
Build Command:  npm run build --workspace=server
Start Command:  npm run start --workspace=server
```

**CRITICAL:** The build command should NOT include `npm ci` - Railpack handles installation automatically.

---

## Outstanding Issues to Address

1. **Database persistence** - SQLite file won't survive deployments
   - Option A: Use Turso (cloud libsql) - RECOMMENDED
   - Option B: Use Railway volume (requires Pro plan)
   - Option C: Accept ephemeral data (for demos only)

---

## Environment Variables Needed in Railway

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Auto-set | Railway sets this automatically |
| `NODE_ENV` | Yes | Set to `production` |
| `JWT_SECRET` | Yes | Strong random secret |
| `DATABASE_URL` | Maybe | Only if using Turso |
| `CLIENT_URL` | Yes | Frontend URL for CORS |
| `OPENAI_API_KEY` | Optional | For AI coach feature |
