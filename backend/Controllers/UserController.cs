using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TheaterContext _context;

        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, TheaterContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _context = context;
        }
        
        // GET: api/User
        [HttpGet, Authorize(Roles = "Medewerker")]
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetUser()
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }
            var x = await _userManager.Users.ToListAsync();
            return x;
        }

        // GET: api/User/{id}
        [HttpGet("{id}"), Authorize(Roles = "Medewerker")]
        public async Task<ActionResult<IdentityUser>> GetUser(string id)
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

        // POST: api/Login
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "Medewerker")]
        public async Task<ActionResult<IdentityUser>> PostUser(User user)
        {
            if (_userManager == null)
            {
                return Problem("Entity set 'UserContext.User'  is null.");
            }
            var resultaat = await CreateUserAsync(user.Email, user.Password);
            // _context.User.Add(user);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetUser", new { id = user.Id }, user);
            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
        }
        
        [NonAction]
        public async Task<IdentityResult> CreateUserAsync(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user, password);    
            return result;
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

        // private bool UserExists(int id)
        // {
        //     return (_context.User?.Any(e => e.Id == id)).GetValueOrDefault();
        // }


    }
}
