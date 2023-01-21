using backend.model;
using backend.Service;
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
    public async Task<IActionResult> Registreer([FromBody] User user)
    {
        var result = await _accountService.Registreer(user);
        if (result != null)
        {
            return Created("theaterlaak.site", user);
        }

        return BadRequest("Uhoh, something went wrong.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        return await _accountService.Login(user);
    }

}