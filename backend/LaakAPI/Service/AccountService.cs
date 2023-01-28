using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Service;

public interface IAccountService
{
    Task<IdentityUser> Registreer([FromBody] UserRegistrationDTO user);
    Task<IActionResult> Login([FromBody] UserLoginDTO user);
    Task<IActionResult> getRoles(string id);
    Task<IActionResult> addRole(string id, string role);
}

public class AccountService : IAccountService
{
    private readonly UserManager<IUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AccountService(UserManager<IUser> userManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _configuration = configuration;
        _roleManager = roleManager;
    }

    public async Task<IdentityUser> Registreer( UserRegistrationDTO user)
    {
        var _user = new IUser() {UserName = user.UserName, Email = user.Email};
        var resultaat = await _userManager.CreateAsync(_user, user.Password);
        if (resultaat.Succeeded)
        {
            if (_userManager.GetRolesAsync(_user).Result.IsNullOrEmpty())
            {
                await _userManager.AddToRoleAsync(_user, "Bezoeker");
            }
            return await _userManager.FindByNameAsync(_user.UserName);
        }
        return null;
    }

    public async Task<IActionResult> Login(UserLoginDTO user)
    {
        var _user = await _userManager.FindByNameAsync(user.UserName);
        if (_user != null)
            if (await _userManager.CheckPasswordAsync(_user, user.Password))
            {
                var secret = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        _configuration["Jwt:Key"]));

                var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.UserName) };
                var roles = await _userManager.GetRolesAsync(_user);
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                    claims.Add(new Claim("role", role));
                }

                var tokenOptions = new JwtSecurityToken
                (
                    issuer: "http://api.localhost",
                    audience: "http://api.localhost",
                    claims: claims,
                    expires: DateTime.Now.AddDays(2),
                    signingCredentials: signingCredentials
                );
                return new OkObjectResult(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
            }

        return new UnauthorizedResult();
    }


    public async Task<IActionResult> getRoles(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user != null)
        {
            var result = await _userManager.GetRolesAsync(user);
            return new OkObjectResult(result);
        }
        return new BadRequestResult();
    }

    public async Task<IActionResult> addRole(string id, string role)
    {
        var roleExist = await _roleManager.RoleExistsAsync(role);
        if  (!roleExist) {
            return new BadRequestObjectResult("Role does not exist.");
        }
        var user = await _userManager.FindByIdAsync(id);
        if (user != null)
        {
            var owned = await _userManager.IsInRoleAsync(user, role);
            if (owned) {
                return new BadRequestObjectResult("User already owns role.");
            }
            var result = await _userManager.AddToRoleAsync(user, role);
            return new OkObjectResult(result);
        }
        return new BadRequestObjectResult("User not found.");
    }



}