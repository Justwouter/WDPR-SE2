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
    public class ZaalController : ControllerBase
    {
        private readonly ZaalContext _context;

        public ZaalController(ZaalContext context)
        {
            _context = context;
        }

        // GET: api/Zaal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zaal>>> GetZaal()
        {
          if (_context.Zaal == null)
          {
              return NotFound();
          }
            return await _context.Zaal.ToListAsync();
        }
        // Maakt een standaard lijst afhankelijk van de waardes in Zaal X
        // [HttpGet("{id}/StoelenLijst")]
        // public IActionResult Get(int id)
        // {
            
        //     var Eerste = _context.Zaal.Where(x => x.Id.Equals(id)).Select(c => c.EersteR).ToList();
        //     var Tweede = _context.Zaal.Where(x => x.Id.Equals(id)).Select(c => c.TweedeR).ToList();
        //     var Derde = _context.Zaal.Where(x => x.Id.Equals(id)).Select(c => c.DerdeR).ToList();

        //     var StoelenLijst = new List<Stoel>{};
        //     if(Eerste[0] != 0){
        //         for(int i = 1; i <= Eerste[0]; i++){
        //         StoelenLijst.Add(new Stoel() {Id = i, Rang = "A", Status = false});
        //         }
        //     }

        //     if(Tweede[0] != 0){
        //         for(int i = 1; i <= Tweede[0]; i++){
        //         StoelenLijst.Add(new Stoel() {Id = i,Rang = "B", Status = false});
        //         }
        //     }

        //     if(Derde[0] != 0){
        //         for(int i = 1; i <= Derde[0]; i++){
        //         StoelenLijst.Add(new Stoel() {Id = i,Rang = "C", Status = false});
        //         }
        //     }
            
        //     return Ok(StoelenLijst);
        // }

        // GET: api/Zaal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Zaal>> GetZaal(int id)
        {
          if (_context.Zaal == null)
          {
              return NotFound();
          }
            var zaal = await _context.Zaal.FindAsync(id);

            if (zaal == null)
            {
                return NotFound();
            }

            return zaal;
        }

        // PUT: api/Zaal/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZaal(int id, Zaal zaal)
        {
            if (id != zaal.Id)
            {
                return BadRequest();
            }

            _context.Entry(zaal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZaalExists(id))
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

        // POST: api/Zaal
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Zaal>> PostZaal(Zaal zaal)
        {
          if (_context.Zaal == null)
          {
              return Problem("Entity set 'ZaalContext.Zaal'  is null.");
          }
            _context.Zaal.Add(zaal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZaal", new { id = zaal.Id }, zaal);
        }

        // DELETE: api/Zaal/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZaal(int id)
        {
            if (_context.Zaal == null)
            {
                return NotFound();
            }
            var zaal = await _context.Zaal.FindAsync(id);
            if (zaal == null)
            {
                return NotFound();
            }

            _context.Zaal.Remove(zaal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ZaalExists(int id)
        {
            return (_context.Zaal?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
