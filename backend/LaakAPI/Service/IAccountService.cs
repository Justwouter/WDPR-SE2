using backend.model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Service;

public interface IAccountService
{
    Task<ActionResult<IEnumerable<User>>> Registreer([FromBody] User user);
    Task<IActionResult> Login([FromBody] User user);
}