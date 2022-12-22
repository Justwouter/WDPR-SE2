using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CastLidController : ControllerBase
    {
        private readonly CastLidContext _context;

        public CastLidController(CastLidContext context)
        {
            _context = context;
        }

        // GET: api/CastLid
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CastLid>>> GetCastLid()
        {
          if (_context.CastLid == null)
          {
              return NotFound();
          }
            return await _context.CastLid.ToListAsync();
        }

        // GET: api/CastLid/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CastLid>> GetCastLid(int id)
        {
          if (_context.CastLid == null)
          {
              return NotFound();
          }
            var castLid = await _context.CastLid.FindAsync(id);

            if (castLid == null)
            {
                return NotFound();
            }

            return castLid;
        }

        // PUT: api/CastLid/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCastLid(int id, CastLid castLid)
        {
            if (id != castLid.Id)
            {
                return BadRequest();
            }

            _context.Entry(castLid).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CastLidExists(id))
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

        // POST: api/CastLid
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CastLid>> PostCastLid(CastLid castLid)
        {
          if (_context.CastLid == null)
          {
              return Problem("Entity set 'CastLidContext.CastLid'  is null.");
          }
            _context.CastLid.Add(castLid);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCastLid", new { id = castLid.Id }, castLid);
        }

        // DELETE: api/CastLid/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCastLid(int id)
        {
            if (_context.CastLid == null)
            {
                return NotFound();
            }
            var castLid = await _context.CastLid.FindAsync(id);
            if (castLid == null)
            {
                return NotFound();
            }

            _context.CastLid.Remove(castLid);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CastLidExists(int id)
        {
            return (_context.CastLid?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
