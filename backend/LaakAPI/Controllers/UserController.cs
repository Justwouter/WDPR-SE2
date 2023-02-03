using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserManager<IUser> _userManager;
        private readonly SignInManager<IUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TheaterContext _context;

        public UserController(UserManager<IUser> userManager, SignInManager<IUser> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, TheaterContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _context = context;
        }

        // GET: api/User
        [HttpGet, Authorize(Roles = "Medewerker")] //, Authorize(Roles = "Medewerker")
        public async Task<ActionResult<IEnumerable<IUser>>> GetUser()
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }
            var x = await _userManager.Users.ToListAsync();
            return x;
        }

        [HttpGet("checkRole")]
        public async Task<IActionResult> CheckRole(string userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.IsInRoleAsync(user, roleName);
            if (result)
            {
                return Ok("The user has " + roleName + " as a role.");
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("checkNameForRole")]
        public async Task<IActionResult> CheckRoleByName(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.IsInRoleAsync(user, roleName);
            if (result)
            {
                return Ok("The user has " + roleName + " as a role.");
            }
            else
            {
                return NoContent();
            }
        }


        [HttpGet("GetRolesAndUsers"), Authorize(Roles = "Medewerker")]
        public async Task<IActionResult> GetRolesAndUsers()
        {
            List<object> userlist = new List<object>();
            foreach (IUser user in await _userManager.Users.ToListAsync())
            {
                var userroles = await _userManager.GetRolesAsync(user);
                var anonymous = new { userName = user.UserName, id = user.Id, roles = userroles };
                userlist.Add(anonymous);
            }
            return Ok(userlist);
        }

        // GET: api/User/{id}
        [HttpGet("{id}"), Authorize(Roles = "Medewerker")]
        public async Task<ActionResult<IUser>> GetUser(string id)
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id}"), Authorize(Roles = "Medewerker")]
        public async Task<ActionResult> UpdateEmail(string id, string email)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Email = email;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return NoContent();
            }

            return BadRequest();
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "Medewerker")]
        public async Task<ActionResult<IUser>> PostUser(UserRegistrationDTO user)
        {
            if (_userManager == null)
            {
                return Problem("Entity set 'UserContext.User'  is null.");
            }
            var _user = new IUser() {UserName = user.UserName, Email = user.Email};
            var resultaat = await _userManager.CreateAsync(_user, user.Password);
            // _context.User.Add(user);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetUser", new { id = user.Id }, user);
            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
        }

        // DELETE: api/Login/5
        [HttpDelete("{id}"), Authorize(Roles = "Medewerker")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // _context.User.Remove(user);
            await _userManager.DeleteAsync(user);

            return NoContent();
        }

    }
}
