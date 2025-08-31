# FlagExplorer
Gets Countries and displays some stats
FlagExplorer is a web application that allows users to browse and explore country flagsfrom around the world. The application consists of two main components:

Backend API
A .NET Core Web API that serves as the data provider

Frontend Application
An Angular application that displays the data in a user-friendlyinterface
The application fetches country data from an external API (RestCountries) and presents itto users in an organized manner, allowing them to browse country flags and view detailedinformation about each country.

 Architecture
	 Backend Architecture
		The backend follows a clean architecture pattern with clear separation of concerns:
		FlagExplorer.Core: Contains domain entities (Country)
		FlagExplorer.Application: Contains interfaces and DTOs
		FlagExplorer.Infrastructure: Contains service implementations
		FlagExplorer.Api: Contains API controllers and configuration

This layered architecture promotes:
Separation of concerns
Testability
Maintainability
Dependency inversion

	Frontend Architecture
	The Angular frontend follows a component-based architecture:
		Components: Home and Country Detail components
		Services: Country service for API communication
		Models: TypeScript interfaces for data types
		Routing: Angular Router for navigation between views


Technologies Used
	Backend Technologies
		.NET 9.0: The latest version of .NET Core
		ASP.NET Core Web API: For building RESTful APIs
		Dependency Injection: Built-in DI container
		HttpClient: For external API communication
		xUnit: For integration testing
		Swagger/OpenAPI: For API documentation
	Frontend Technologies
Angular 17+: Modern frontend framework (using signals)
TypeScript: Strongly-typed JavaScript
Angular Router: For client-side routing
HttpClient: For API communication
RxJS: For reactive programming
Angular CLI: For project scaffolding and building

Key Features
Country Flag Browsing: Grid display of country flags
Country Details: Detailed view of country information
Responsive Design: Works on different screen sizes
API Integration: Fetches data from external API
Error Handling: Proper error handling for API requests

Data Flow
1.External API Integration:
The backend connects to the RestCountries API (https://restcountries.com/)
Data is fetched, transformed, and served through the backend API
2.API Endpoints:
GET /api/Countries: Returns a list of all countries with basic info
GET /api/Countries/{name}: Returns detailed information about a specificcountry

FlagExplorer_Analysis
Frontend Data Consumption:
Angular services make HTTP requests to the backend API
Components subscribe to these services and display the data
Router navigation allows users to move between views
