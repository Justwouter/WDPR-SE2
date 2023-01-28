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
    public async Task<IActionResult> Registreer([FromBody] UserRegistrationDTO user)
    {
        var result = await _accountService.Registreer(user);
        if (result != null)
        {
            return Created("frontend.localhost", user);
        }

        return BadRequest("Uhoh, something went wrong.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDTO user)
    {
        return await _accountService.Login(user);
    }

    [HttpGet("rollen")]
    public async Task<IActionResult> getRoles(string id)
    {
        return await _accountService.getRoles(id);
    }

    [HttpPut("rollen")]
    public async Task<IActionResult> addRole(string id, string role)
    {
        return await _accountService.addRole(id, role);
    }

}