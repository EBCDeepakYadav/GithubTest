# XML Documentation
## Summary
Initializes a new instance of the `UserAuthController` class.
## Parameters
- **userAuthService**: The service responsible for handling user authentication operations.
- **logger**: The logger instance used to log messages for the `UserAuthController`.
- **config**: The application configuration settings.
 <span style="color:green">The application configuration settings.</span>

```C#
public class RoleService : IRoleService
{
    private readonly YourDbContext _context;
    public RoleService(YourDbContext context)
    {
        _context = context;
    }
    public async Task<List<string>> GetUserRolesAsync(string username) -- Done
    {
        // Adjust this query to match your schema
        return await _context.UserRoles
            .Where(ur => ur.User.Username == username)
            .Select(ur => ur.Role.Name)
            .ToListAsync();
    }
}
```
## Process of user Authentication and Authorization
###  Authorization
- **name** : There will be name here of the user after login to the app.
- new item: new item will here

## New block

- **item** : there will be item here
- **Item2** : there will be item2 here
## New block 2
### requirements for new block 2
- .Net core 6.0
- C#
- Entity Framework Core
- SQL Server
- ASP.NET Core Identity
- JWT (JSON Web Tokens)
- AutoMapper
- Swagger (for API documentation)
- xUnit (for unit testing)
- Moq (for mocking in tests)
- FluentValidation (for input validation)
- Serilog (for logging)
- Redis (for caching, optional)
- Docker (for containerization, optional)
- Kubernetes (for orchestration, optional)
- Git (for version control)
- GitHub or GitLab (for repository hosting)
- Postman (for API testing)
- Visual Studio or VS Code (for development)
- Azure DevOps or GitHub Actions (for CI/CD)
- NUnit (for unit testing, alternative to xUnit)
- MSTest (for unit testing, alternative to xUnit)
- NSubstitute (for mocking in tests, alternative to Moq)
- Bogus (for generating fake data in tests)
- Polly (for resilience and transient-fault-handling)
- HealthChecks (for monitoring application health)
- OpenTelemetry (for observability and tracing)
- New Relic or Application Insights (for performance monitoring)
