# CodeEditor

An online Code Editor web application developed using **HTML, CSS, JavaScript, Java, Spring Boot, and MySQL**.  
The project provides a simple and user-friendly platform for working with code through a web interface.

## Features

-  User-friendly code editing interface
-  Web-based code editor
-  Project and code management
-  User registration functionality
-  Backend API integration
-  MySQL database connectivity
-  Responsive web interface
-  REST API support using Spring Boot

##  Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA

### Database
- MySQL

### Tools
- Visual Studio Code
- IntelliJ IDEA / Spring Tool Suite
- MySQL
- Git
- GitHub
- Maven

## 📁 Project Structure

```text
CodeEditor/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       ├── controller/
│   │   │       ├── entity/
│   │   │       └── DemoApplication.java
│   │   │
│   │   └── resources/
│   │       └── static/
│   │
│   └── test/
│
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .gitignore
└── README.md
Installation & Setup
1. Clone the repository
git clone https://github.com/bojanapukavitha14/CodeEditor.git
2. Open the project
Open the project in VS Code, IntelliJ IDEA, or Spring Tool Suite.
3. Configure MySQL
Create a MySQL database for the project.
Example:
CREATE DATABASE code_editor_db;
Update the database configuration in:
src/main/resources/application.properties
Add your MySQL username and password.
4. Run the application
Using Maven:
mvn spring-boot:run
Or run the main Spring Boot application:
DemoApplication.java
5. Open the application
After starting the server, open the application in your browser using the configured local server address.
Example:
http://localhost:8080
 Backend
The backend is developed using Spring Boot and provides REST APIs for handling application functionality and database operations.
The project contains controllers for different application operations, including:
User management
Code-related operations
Project management
Authentication-related operations
 Database
The application uses MySQL for storing application data.
Database integration is implemented using:
Spring Data JPA
Hibernate
MySQL
 Project Objective
The main objective of this project is to develop a simple web-based coding environment with a modern frontend and a Java Spring Boot backend.
It demonstrates practical knowledge of:
Full-stack web development
REST APIs
Java programming
Spring Boot
Database connectivity
CRUD operations
Frontend and backend integration
 Screenshots
Add screenshots of your application here.
Example:
![CodeEditor Home Page](screenshots/home.png)

![CodeEditor Dashboard](screenshots/dashboard.png)
 Future Enhancements
Support for multiple programming languages
Online code compilation and execution
Syntax highlighting
Code auto-completion
User authentication and authorization
Save and share code snippets
Dark/Light mode
Improved code execution environment
 Developer
Kavitha Bhojanapu
B.Tech – Computer Science and Engineering (Data Science)
 License
This project is developed for educational and academic purposes.

### One small recommendation

Since this is going on your **GitHub portfolio**, keep the README professional and add **2–3 screenshots of your actual CodeEditor pages** under the `📸 Screenshots` section. That will make the repository much easier for a recruiter to understand at a glance.
