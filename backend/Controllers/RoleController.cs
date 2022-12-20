using backend.model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly TheaterContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(TheaterContext context, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _roleManager = roleManager;
        }

        // GET: api/Role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IdentityRole>>> GetRole()
        {
            if (_roleManager.Roles == null)
            {
                return NotFound();
            }
            Console.WriteLine(_roleManager.Roles);
            return await _roleManager.Roles.ToListAsync();
        }

        // GET: api/Role/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<IdentityRole>> GetRole(string id)
        // {
        //     if (_roleManager.Roles == null)
        //     {
        //         return NotFound();
        //     }
        //     var role = await _context.Role.FindAsync(id);
        //
        //     if (role == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     return role;
        // }

        // PUT: api/Role/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(string id, Role role)
        {
            if (id != role.Id)
            {
                return BadRequest();
            }

            _context.Entry(role).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Role
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "Medewerker")]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            await _roleManager.CreateAsync(role);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RoleExists(role.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRole", new { id = role.Id }, role);
        }

        // DELETE: api/Role/5
        [HttpDelete("{id}"), Authorize(Roles = "Medewerker")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            if (_roleManager.FindByIdAsync(id) == null)
            {
                return NotFound();
            }
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            await _roleManager.DeleteAsync(role);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleExists(string id)
        {
            return (_roleManager.Roles?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
