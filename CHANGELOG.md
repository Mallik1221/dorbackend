
---

## **CHANGELOG.md**

```md
# Changelog

All notable changes to this project will be documented in this file.  
The format follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2025-09-03
### Added
- Migrated backend from CommonJS to ES6 module syntax.
- Modularized backend folder structure:
  - `controllers/` for application logic.
  - `routes/` for API endpoints.
  - `models/` for database schemas.
  - `config/` for MongoDB connection.
  - `app.js` for Express app configuration.
  - `server.js` for server bootstrap.
- Implemented **Application APIs** (CRUD for Purifiers).
- Implemented **Developer APIs** for IoT devices:
  - `GET /api/purifiers/:id/status` → Returns switch status.
  - `GET /api/purifiers/:id/status?onlineStatus=1` → Returns switch status & temporarily activates purifier.
  - `PUT /api/purifiers?id=123&status=0` → Updates switch status.
- Centralized error handling middleware.

### Changed
- Refactored existing monolithic routes into separate controllers and developer API controllers.
- Disabled unnecessary headers (`x-powered-by`, `etag`, etc.) for security & performance.

### Notes
- This is the **first stable release (v1.0.0)** after modularization.
- Developer APIs are stable and ready for IoT hardware integration.
- Next steps: Real-time updates with **Socket.IO** (planned for `v1.1.0`).
