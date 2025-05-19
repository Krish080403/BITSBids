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
     - [3a. Using Maven Wrapper or Maven CLI](#3a-using-maven-wrapper-or-maven-cli)  
     - [3b. Using Spring Tool Suite (STS)](#3b-using-spring-tool-suite-sts)  
   - [4. Run the Frontend](#4-run-the-frontend)  
4. [Packaging & Deployment](#packaging--deployment)  
5. [Troubleshooting](#troubleshooting)  
6. [Contact](#contact)

---

## Tech Stack & Versions

- **Backend**  
  - Java 21  
  - Spring Boot 3.1.5  
  - Maven 3.8+ (via wrapper or system install)  
- **Frontend**  
  - Node.js 18+ / npm 9+  
  - React 18.x  
  - Create-React-App (with React Router v6)  
- **Database**  
  - MongoDB (or any other JDBC-/URI-compatible DB)  

---

## Prerequisites

1. **Java 21** installed and on your `PATH`  
2. **Maven 3.8+** (or just use the included Maven Wrapper)  
3. **Node.js 18+ & npm 9+**  
4. **MongoDB** up and running (or another supported DB)  
5. **Spring Tool Suite 4** (for STS instructions)  
6. **Lombok plugin** installed in your IDE (see STS notes below)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Krish080403/BITSBids.git
cd BITSBids
```
### 2. Configure credentials

#### Backend

```bash
cd Backend/src/main/resources
cp application.properties.example application.properties
```

Edit `application.properties` to set your DB connection and JWT secret:

```properties
# MongoDB URI (or replace with your JDBC URL)
spring.data.mongodb.uri=mongodb://localhost:27017/bitsbids
# (if using SQL) spring.datasource.url, username, password, etc.

# (Optional) JWT secret for auth
app.jwtSecret=ChangeThisToAStrongRandomString
```

#### Frontend

```bash
cd ../../Frontend
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

---

### 3. Run the Backend


#### Using Spring Tool Suite (STS)

1. **Import as Maven Project**

   * Open STS → **File → Import… → Existing Maven Projects**
   * Browse to `BITSBids/Backend` and click **Finish**.

2. **Install & Enable Lombok**
   * Install Lombok and place the jar file in the STS directory.
	
	**OR**

   * In STS, go to **Help → Eclipse Marketplace…**, search for **Lombok**, and install **Lombok Annotations Support**.
   * After restart, right-click the project → **Properties → Java Compiler → Annotation Processing**, and ensure **"Enable annotation processing"** is checked.

3. **Set Java 21**

   * Right-click the imported project → **Properties → Java Build Path → Libraries**
   * Ensure the **JRE System Library** points to your **Java 21** installation.
   * If not, click **Add Library → JRE System Library → Installed JREs**, add your JDK 21, and select it.

4. **Run**

   * Right-click the project → **Run As → Spring Boot App**
   * Or open `BiddingAppApplication.java` and click the green ▶️ beside the `main` method.

---

### 4. Run the Frontend

```bash
cd ../Frontend
npm install
npm start
```

Visit **[http://localhost:3000](http://localhost:3000)**; API calls proxy to the backend on port 8080.

---

## Packaging & Deployment

* **Backend**

  ```bash
  cd Backend
  mvn clean package
  # deploy the JAR in target/
  ```
* **Frontend**

  ```bash
  cd Frontend
  npm run build
  # serve build/ on Netlify, S3, or via Spring Boot
  ```

---

## Troubleshooting

* **Java version**

  * Verify with `java -version` → should report **21**
* **Maven errors**

  * Use `mvnw.cmd` if `mvn` isn’t on PATH
* **Port conflicts**

  * Change Spring Boot port in `application.properties`:

    ```properties
    server.port=9090
    ```
  * Change React port:

    ```bash
    PORT=3001 npm start
    ```
* **DB connection**

  * Ensure MongoDB (or your DB) is running and the URI/credentials are correct.
* **Lombok issues**

  * Confirm the IDE plugin is installed and annotation processing is enabled.

---

## Contact

For any questions or issues, reach out to **Krish Mantri** at `krishmantri44@gmail.com`.

```
```






