using backend.model;
using Microsoft.AspNetCore.Mvc;

public interface IAccountService
{
    Task<ActionResult<IEnumerable<User>>> Registreer([FromBody] User user);
    Task<IActionResult> Login([FromBody] User user);
}