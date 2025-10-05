# Backend Starter Template

Production-ready Node.js/Express backend with MongoDB, JWT authentication, validation, and security. Clean architecture with clear module boundaries and centralized index-based imports.

## What's Inside?

Authentication System
- JWT access and refresh tokens
- Password hashing with bcrypt
- Cookie-based secure storage
- Role-based access (client, consultant, admin)

Security Features
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- XSS protection
- Helmet security headers
- Input validation with Joi

Clean Architecture
- Layered structure (models → services → controllers → routes)
- Centralized error handling
- Modular middleware system
- Environment configuration

Database Ready
- MongoDB with Mongoose
- Connection pooling
- Graceful shutdown
- Schema validation

##  Quick Start

### 1️ Clone & Install
```bash
git clone <your-repo>
cd backend-starter-template
npm install
```

### 2) Create Environment
```bash
# Create .env file
MONGO_URI=mongodb://localhost:27017/your-database
JWT_ACCESS_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
COOKIE_SECRET=your-cookie-secret
PORT=5000
```

### 3) Run locally
```bash
npm run dev
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/v1/users/register` |  Sign up |  |
| `POST` | `/api/v1/users/login` |  Sign in |  |
| `POST` | `/api/v1/users/refresh-token` |  Refresh token |  |
| `POST` | `/api/v1/users/logout` |  Sign out |  |

### User Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/v1/users/profile` |  Get profile |  |
| `PUT` | `/api/v1/users/profile` |  Update profile |  |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` |  Server status |

## Tech Stack

| Category | Technology |
|----------|------------|
|  **Runtime** | Node.js |
|  **Framework** | Express.js |
|  **Database** | MongoDB + Mongoose |
|  **Auth** | JWT (jsonwebtoken) |
|  **Validation** | Joi |
|  **Security** | Helmet, XSS-Clean, CORS |
|  **Encryption** | bcrypt |

## Project Structure

```
src/
├──  config/          # Database & environment setup
├──  controllers/     # Request handlers  
├──  middlewares/     # Custom middleware
├──  models/          # Database schemas
├──  routes/          # API endpoints
├──  services/        # Business logic
├──  utils/           # Helper functions
├──  validations/     # Input validation
├──  app.js          # Express configuration
└──  server.js       # Server entry point
```

## Development Commands

```bash
 npm run dev     
 npm start       
 npm run lint    
```

## Example Usage

### Register User
```bash
curl -X POST http://localhost:8000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "password": "SecurePass123",
    "user_type": "client"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

## Adding New Features

1.  **Model**: Create in `src/models/`
2.  **Validation**: Add schema in `src/validations/`
3.  **Service**: Business logic in `src/services/`
4.  **Controller**: Handle requests in `src/controllers/`
5.  **Routes**: Define endpoints in `src/routes/`
6.  **Export**: Update index files

## Production Deployment

### Environment Variables
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_ACCESS_SECRET=super-strong-secret-key
JWT_REFRESH_SECRET=another-strong-secret
COOKIE_SECRET=cookie-secret-key
```

### Production Checklist
- [ ]  Set strong JWT secrets
- [ ]  Use MongoDB Atlas or secured MongoDB
- [ ]  Enable HTTPS
- [ ]  Configure CORS for your domains
- [ ]  Set up logging & monitoring
- [ ]  Use process manager (PM2)

## Contributing

1.  Fork the repo
2.  Create feature branch (`git checkout -b feature/cool-stuff`)
3.  Commit changes (`git commit -m 'Add cool stuff'`)
4.  Push branch (`git push origin feature/cool-stuff`)
5.  Create Pull Request

## Contact

- Email: daniyalsohaildev@gmail.com
- Website: https://daniyalsohail.me
- LinkedIn: https://www.linkedin.com/in/mdaniyal-sohail/

## License

 ISC License - feel free to use this shit however you want!

---

 **If this helped you, give it a star!** ⭐

 **Found a bug?** [Open an issue](../../issues)

💬 **Questions?** Hit me up!
---
