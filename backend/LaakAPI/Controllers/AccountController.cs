using backend.model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost]
    [Route("registreer")]
    public async Task<ActionResult<IEnumerable<User>>> Registreer([FromBody] User user)
    {
        return await _accountService.Registreer(user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        return await _accountService.Login(user);
    }

}