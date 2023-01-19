using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

public class AccountService : IAccountService
{
    private readonly UserManager<IdentityUser> _userManager;

    public AccountService(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<ActionResult<IEnumerable<User>>> Registreer([FromBody] User user)
    {
        var resultaat = await _userManager.CreateAsync(user, user.Password);
        if (user.Type == null)
        {
            user.Type = "Bezoeker";
            resultaat = await _userManager.AddToRoleAsync(user, "Bezoeker");
            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : new StatusCodeResult(201);
        }

        if (user.Type.Equals("Medewerker"))
        {
            resultaat = await _userManager.AddToRoleAsync(user, "Medewerker");
        }

        return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : new StatusCodeResult(201);
    }

    public async Task<IActionResult> Login([FromBody] User user)
    {
        var _user = await _userManager.FindByNameAsync(user.UserName);
        if (_user != null)
            if (await _userManager.CheckPasswordAsync(_user, user.Password))
            {
                var secret = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        "awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));

                var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim> { new Claim( ClaimTypes.Name, user.UserName) };
                var roles = await _userManager.GetRolesAsync(_user);
                foreach (var role in roles)
                    claims.Add(new Claim(ClaimTypes.Role, role));
                var tokenOptions = new JwtSecurityToken
                (
                    issuer: "http://api.localhost",
                    audience: "http://api.localhost",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: signingCredentials
                );
                return new OkObjectResult(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
            }

        return new UnauthorizedResult();
    }

}
