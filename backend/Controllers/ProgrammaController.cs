using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProgrammaController : ControllerBase
    {
        private readonly ProgrammaContext _context;

        public ProgrammaController(ProgrammaContext context)
        {
            _context = context;
        }

        // GET: api/Programma
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Programma>>> GetProgramma()
        {
          if (_context.Programma == null)
          {
              return NotFound();
          }
            return await _context.Programma.ToListAsync();
        }

        // GET: api/Programma/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Programma>> GetProgramma(int id)
        {
          if (_context.Programma == null)
          {
              return NotFound();
          }
            var programma = await _context.Programma.FindAsync(id);

            if (programma == null)
            {
                return NotFound();
            }

            return programma;
        }

        // PUT: api/Programma/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgramma(int id, Programma programma)
        {
            if (id != programma.Id)
            {
                return BadRequest();
            }

            _context.Entry(programma).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgrammaExists(id))
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

        // POST: api/Programma
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Programma>> PostProgramma(Programma programma)
        {
          if (_context.Programma == null)
          {
              return Problem("Entity set 'ProgrammaContext.Programma'  is null.");
          }
            _context.Programma.Add(programma);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgramma", new { id = programma.Id }, programma);
        }

        // DELETE: api/Programma/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgramma(int id)
        {
            if (_context.Programma == null)
            {
                return NotFound();
            }
            var programma = await _context.Programma.FindAsync(id);
            if (programma == null)
            {
                return NotFound();
            }

            _context.Programma.Remove(programma);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProgrammaExists(int id)
        {
            return (_context.Programma?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
