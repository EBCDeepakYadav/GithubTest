# XML Documentation
## Summary
Initializes a new instance of the `UserAuthController` class.
## Parameters
- **userAuthService**: The service responsible for handling user authentication operations.
- **logger**: The logger instance used to log messages for the `UserAuthController`.
- **config**: The application configuration settings.

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
