# BITSBids

A bidding platform for BITS students built with a Spring Boot backend and React frontend.

---

## Table of Contents

1. [Tech Stack & Versions](#tech-stack--versions)  
2. [Prerequisites](#prerequisites)  
3. [Getting Started](#getting-started)  
   - [1. Clone the repo](#1-clone-the-repo)  
   - [2. Configure credentials](#2-configure-credentials)  
   - [3. Run the Backend](#3-run-the-backend)  
   - [4. Run the Frontend](#4-run-the-frontend)  
4. [Packaging & Deployment](#packaging--deployment)  
5. [Troubleshooting](#troubleshooting)  
6. [Contact](#contact)

---

## Tech Stack & Versions

- **Backend**  
  - Java 17 (LTS)  
  - Spring Boot 3.x  
  - Maven 3.8+  
- **Frontend**  
  - Node.js 18+ / npm 9+  
  - React 18.x  
  - Create-React-App (with React Router v6)  
- **Database**  
  - MySQL 8 / MariaDB 10.6+ (or any JDBC-compatible)  

---

## Prerequisites

1. **Java 17**:  
   ```bash
   java -version
   # should be “openjdk version "17.x"”  

2. **Maven 3.8+**:

   ```bash
   mvn -v
   ```
3. **Node.js 18+ & npm 9+**:

   ```bash
   node -v && npm -v
   ```
4. **MySQL 8** up and running (or another JDBC-compatible DB).

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Krish080403/BITSBids.git
cd BITSBids
```

### 2. Configure credentials

#### Backend

Copy and edit the properties template:

```bash
cd Backend/src/main/resources
cp application.properties.example application.properties
```

Then open `application.properties` and set your DB and JWT/secret keys:

```properties
# JDBC URL to your local DB
spring.datasource.url=jdbc:mysql://localhost:3306/bitsbids
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update

# (Optional) JWT secret for auth
app.jwtSecret=ChangeThisToAStrongRandomString
```

#### Frontend

In the `Frontend/` folder, create a `.env`:

```bash
cd ../../Frontend
cp .env.example .env
```

Set the API base URL and any keys:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### 3. Run the Backend

From the `Backend/` folder:

```bash
mvn clean spring-boot:run
```

If you prefer a runnable JAR:

```bash
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

By default the app will start on **port 8080**.

### 4. Run the Frontend

```bash
cd ../Frontend
npm install
npm start
```

The React app should open at **[http://localhost:3000](http://localhost:3000)** and proxy API calls to your backend.

---

## Packaging & Deployment

* **Backend**:

  * Build with `mvn clean package` → deployment JAR in `Backend/target/`
* **Frontend**:

  * Build for production:

    ```bash
    npm run build
    ```
  * Deploy the `build/` folder on any static-hosting (Netlify, S3, etc.) or serve via your Java backend.

---

## Troubleshooting

* **Port conflicts**

  * Change Spring Boot port in `application.properties`:

    ```properties
    server.port=9090
    ```
  * Change React port:

    ```bash
    SKIP_PREFLIGHT_CHECK=true PORT=3001 npm start
    ```
* **DB connection errors**

  * Verify JDBC URL, credentials, and that MySQL is listening on `localhost:3306`.
* **CORS issues**

  * Ensure backend has CORS enabled for `http://localhost:3000`.

---

## Contact

For any questions or issues, reach out to **Krish Mantri** at `krish.mantri@example.com`.

```
```
