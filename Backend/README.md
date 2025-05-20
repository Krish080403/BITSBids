## BITSBids – Backend

This is the Spring Boot backend for BITSBids, providing RESTful APIs, authentication, and data persistence.

## Tech Stack & Versions

- **Java:** 21  
- **Spring Boot:** 3.1.5  
- **Maven:** 3.8+ (use `mvnw` if you don’t have Maven installed)  
- **Database:** MongoDB (or any other JDBC-/URI-compatible DB)  
- **JWT:** JSON Web Token support for authentication  
- **Lombok:** For boilerplate code reduction  

## Prerequisites

1. Java 21 installed and on your `PATH`.  
2. Maven 3.8+ (or use the included Maven Wrapper).  
3. MongoDB up and running (or a compatible JDBC URI).  
4. Lombok plugin installed in your IDE.  

## Configuration

1. Copy the example properties file and edit:  
   ```bash
   cd Backend/src/main/resources
   cp application.properties.example application.properties
   
2. In application.properties, set:
 MongoDB URI
spring.data.mongodb.uri=mongodb://localhost:27017/bitsbids

 JWT secret (choose a strong random string)
app.jwtSecret=ChangeThisToAStrongRandomString

## Running the Backend

## Using Spring Tool Suite (STS)

1. **Import** → Existing Maven Project → select `BITSBids/Backend`.
2. Ensure Lombok is installed and annotation processing is enabled.
3. Set Project JRE to Java 21 under **Properties → Java Build Path → Libraries**.
4. Right-click the project → **Run As → Spring Boot App**.

The API will listen on `http://localhost:8080/api`.

# Packaging

```bash
cd Backend
./mvnw clean package
# JAR will be in target/; deploy as needed
```

# Troubleshooting

* **Java version mismatch:**
  Verify `java -version` outputs “21”.

* **Port conflict:**
  Change server port in `application.properties`:

  ```properties
  server.port=9090
  ```

* **DB connection errors:**
  Ensure MongoDB is running and your URI is correct.

```
```
