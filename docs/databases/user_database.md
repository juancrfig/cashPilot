# USER DATABASE DOCUMENTATION


### USERS Table
Stores user account information and authentication details.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `uuid` | uuid | PRIMARY KEY | Unique identifier for the user |
| `email` | varchar | NOT NULL | User's email address for authentication |
| `password_hash` | varchar | NOT NULL | Hashed password for secure authentication |
| `first_name` | varchar | | User's first name |
| `last_name` | varchar | | User's last name |
| `status` | UserStatus | ENUM | Current status of the user account |
| `email_verified_at` | timestamp | | Timestamp when email was verified |
| `created_at` | timestamp | | Account creation timestamp |
| `updated_at` | timestamp | | Last account update timestamp |
| `deleted_at` | timestamp | | Soft delete timestamp (null if active) |

### SESSIONS Table
Manages user authentication sessions and activity tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Unique session identifier |
| `user_id` | uuid | NOT NULL, FK → USERS.uuid | Reference to the authenticated user |
| `ip_address` | varchar | | IP address from which the session originated |
| `user_agent` | varchar | | Browser/device information |
| `last_activity` | timestamp | | Timestamp of last session activity |
| `expires_at` | timestamp | | Session expiration timestamp |
| `created_at` | timestamp | | Session creation timestamp |

### REFRESH_TOKENS Table
Handles JWT refresh token management for secure authentication.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Unique token identifier |
| `user_id` | uuid | NOT NULL, FK → USERS.uuid | Reference to the token owner |
| `token` | varchar | NOT NULL | Refresh token string |
| `device_id` | varchar | | Identifier for the device using the token |
| `expires_at` | timestamp | | Token expiration timestamp |
| `revoked` | boolean | | Flag indicating if token has been revoked |
| `created_at` | timestamp | | Token creation timestamp |

## Security Features

- **Password Hashing**: Passwords are stored as hashes, never in plain text
- **Session Management**: IP address and user agent tracking for security monitoring
- **Token Revocation**: Refresh tokens can be revoked for security purposes
- **Soft Deletes**: User accounts are soft-deleted (deleted_at) allowing for data recovery
- **Email Verification**: Tracks whether user emails have been verified

## Enums

### UserStatus
Defines the current state of a user account.

| Value | Description |
|-------|-------------|
| `active` | User account is active and can access the system |
| `inactive` | User account is temporarily inactive (e.g., user deactivated it) |
| `suspended` | User account has been suspended by administrators |