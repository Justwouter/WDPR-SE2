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
    public class PreformanceController : ControllerBase
    {
        private readonly TheaterContext _context;

        public PreformanceController(TheaterContext context)
        {
            _context = context;
        }

        // GET: api/Preformance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Preformance>>> GetOptredens()
        {
          if (_context.Optredens == null)
          {
              return NotFound();
          }
            return await _context.Optredens.ToListAsync();
        }

        // GET: api/Preformance/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Preformance>> GetPreformance(int id)
        {
          if (_context.Optredens == null)
          {
              return NotFound();
          }
            var preformance = await _context.Optredens.FindAsync(id);

            if (preformance == null)
            {
                return NotFound();
            }

            return preformance;
        }

        // PUT: api/Preformance/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPreformance(int id, Preformance preformance)
        {
            if (id != preformance.Id)
            {
                return BadRequest();
            }

            _context.Entry(preformance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PreformanceExists(id))
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

        // POST: api/Preformance
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Preformance>> PostPreformance(Preformance preformance)
        {
          if (_context.Optredens == null)
          {
              return Problem("Entity set 'TheaterContext.Optredens'  is null.");
          }
            _context.Optredens.Add(preformance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPreformance", new { id = preformance.Id }, preformance);
        }

        // DELETE: api/Preformance/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePreformance(int id)
        {
            if (_context.Optredens == null)
            {
                return NotFound();
            }
            var preformance = await _context.Optredens.FindAsync(id);
            if (preformance == null)
            {
                return NotFound();
            }

            _context.Optredens.Remove(preformance);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PreformanceExists(int id)
        {
            return (_context.Optredens?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
