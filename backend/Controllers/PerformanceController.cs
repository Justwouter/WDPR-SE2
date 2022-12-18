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
    public class PerformanceController : ControllerBase
    {
        private readonly TheaterContext _context;

        public PerformanceController(TheaterContext context)
        {
            _context = context;
        }

        // GET: api/Performance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Performance>>> GetOptredens()
        {
          if (_context.Optredens == null)
          {
              return NotFound();
          }
            return await _context.Optredens.ToListAsync();
        }

        // GET: api/Performance/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Performance>> GetPerformance(int id)
        {
          if (_context.Optredens == null)
          {
              return NotFound();
          }
            var performance = await _context.Optredens.FindAsync(id);

            if (performance == null)
            {
                return NotFound();
            }

            return performance;
        }

        // PUT: api/Performance/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerformance(int id, Performance performance)
        {
            if (id != performance.Id)
            {
                return BadRequest();
            }

            _context.Entry(performance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PerformanceExists(id))
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

        // POST: api/Performance
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Performance>> PostPerformance(Performance performance)
        {
          if (_context.Optredens == null)
          {
              return Problem("Entity set 'TheaterContext.Optredens'  is null.");
          }
            _context.Optredens.Add(performance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerformance", new { id = performance.Id }, performance);
        }

        // DELETE: api/Performance/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerformance(int id)
        {
            if (_context.Optredens == null)
            {
                return NotFound();
            }
            var performance = await _context.Optredens.FindAsync(id);
            if (performance == null)
            {
                return NotFound();
            }

            _context.Optredens.Remove(performance);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PerformanceExists(int id)
        {
            return (_context.Optredens?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
