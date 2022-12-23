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
        private readonly ZaalContext _contextZaal;
        

        public ProgrammaController(ProgrammaContext context, ZaalContext zaalContext)
        {
            _context = context;
            _contextZaal = zaalContext;
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

        [HttpGet("{id}/StoelenLijst")]
        public async Task<ActionResult<IEnumerable<Stoel>>> GetStoelenLijst(int id)
        {
          if (_context.Stoel == null)
          {
              return NotFound();
          }
            return await _context.Stoel.Where(s => s.ProgrammaId == id).ToListAsync();
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
            if (id != programma.ProgrammaId)
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

        [HttpPut("Stoel/{id}}")]
        public async Task<IActionResult> PutStoel(int id, Stoel stoel)
        {
            if (id != stoel.StoelId)
            {
                return BadRequest();
            }

            _context.Entry(stoel).State = EntityState.Modified;

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
        public async Task<ActionResult<Programma>> PostProgramma([FromBody] Programma programma)
        {
          if (_context.Programma == null)
          {
              return Problem("Entity set 'ProgrammaContext.Programma'  is null.");
          }
            _context.Programma.Add(programma);
            //_context.Stoel.Add(postStandardLijst(programma.Zaal))
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgramma", new { id = programma.ProgrammaId }, programma);
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
            return (_context.Programma?.Any(e => e.ProgrammaId == id)).GetValueOrDefault();
        }

        
        // public List<Stoel> postStandardLijst(int id)
        // {
            
        //     var Eerste = _contextZaal.Zaal.Where(x => x.Id.Equals(id)).Select(c => c.EersteR).ToList();
        //     var Tweede = _contextZaal.Zaal.Where(x => x.Id.Equals(id)).Select(c => c.TweedeR).ToList();
        //     var Derde = _contextZaal.Zaal.Where(x => x.Id.Equals(id)).Select(c => c.DerdeR).ToList();

        //     var StoelenLijst = new List<Stoel>{};
        //     if(Eerste[0] != 0){
        //         for(int i = 1; i <= Eerste[0]; i++){
        //         StoelenLijst.Add(new Stoel() {Nr = i, Rang = "A", Status = false});
        //         }
        //     }

        //     if(Tweede[0] != 0){
        //         for(int i = 1; i <= Tweede[0]; i++){
        //         StoelenLijst.Add(new Stoel() {Nr = i,Rang = "B", Status = false});
        //         }
        //     }

        //     if(Derde[0] != 0){
        //         for(int i = 1; i <= Derde[0]; i++){
        //         StoelenLijst.Add(new Stoel() {Nr = i,Rang = "C", Status = false});
        //         }
        //     }
            
        //     return StoelenLijst;
        // }
    }
}
