using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
        IConfiguration configuration, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _roleManager = roleManager;
    }

    [HttpPost]
    [Route("registreer")]
    public async Task<ActionResult<IEnumerable<User>>> Registreer([FromBody] User user)
    {
        var resultaat = await _userManager.CreateAsync(user, user.Password);
        if (user.Type == null)
        {
            user.Type = "Bezoeker";
            resultaat = await _userManager.AddToRoleAsync(user, "Bezoeker");
            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
        }

        if (user.Type.Equals("Medewerker"))
        {
            resultaat = await _userManager.AddToRoleAsync(user, "Medewerker");
        }

        return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        var result = await _signInManager.PasswordSignInAsync(user.UserName, user.Password, false, lockoutOnFailure: false);
        // var _user = await _userManager.FindByNameAsync(user.UserName);
        if (result.Succeeded)
            if (await _userManager.CheckPasswordAsync(user, user.Password))
            {
                var secret = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        "awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));

                var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.UserName) };
                var roles = await _userManager.GetRolesAsync(user);
                foreach (var role in roles)
                    claims.Add(new Claim(ClaimTypes.Role, role));
                var tokenOptions = new JwtSecurityToken
                (
                    issuer: "https://localhost:7153",
                    audience: "https://localhost:7153",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: signingCredentials
                );
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
            }

        return Unauthorized();
    }
}