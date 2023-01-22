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
    public class OrderController : ControllerBase
    {
        private readonly OrderContext _context;
        private readonly ProgrammaContext programma_context;

        public OrderController(OrderContext context, ProgrammaContext programmaContext)
        {
            _context = context;
            programma_context = programmaContext;
          
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            return await _context.Order.ToListAsync();
        }

         // GET: api/Betaling
        [HttpGet("/api/Betaling")]
        public async Task<ActionResult<IEnumerable<Betaling>>> GetBetaling()
        {
          if (_context.Betaling == null)
          {
              return NotFound();
          }
            return await _context.Betaling.ToListAsync();
        }

        [HttpGet("/api/Betaling/{bnr}")]
        public async Task<ActionResult<Betaling>> GetBetalingBnr(string bnr)
        {
          if (_context.Betaling == null)
          {
              return NotFound();
          }
            var b = _context.Betaling.Where(w => w.reference == bnr).Select(w => w.BetalingId).Single();
            var betaling = await _context.Betaling.FindAsync(b);

            if (betaling == null)
            {
                return NotFound();
            }

            return betaling;
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            var order = await _context.Order.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpGet("By/{bnr}")]
        public async Task<ActionResult<Order>> GetOrderBnr(string bnr)
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            var order = _context.Order.Where(w => w.BetalingNr == bnr).Select(w => w.OrderId).Single();
            var order2 = await _context.Order.FindAsync(order);

            if (order2 == null)
            {
                return NotFound();
            }

            return order2;
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder( [FromBody] Order order)
        {
          if (_context.Order == null)
          {
              return Problem("Entity set 'OrderContext.Order'  is null.");
          }
            _context.Order.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }
        

        [HttpPost("/api/Betaling/")]

        public async Task<ActionResult> PostBetaling( [FromForm] Betaling betaling)
        {
         
            Boolean Succesvol = false;

            if (_context.Betaling == null)
                {
                    return Problem("Entity set 'BetalingContext.Betaling'  is null.");
                }
            
            //Zet alle stoelen weer vrij als de betaling is mislukt
             if(betaling.account == "NL55ABNA5660751954" || betaling.account == "NL02INGB8635612388" && new Random().Next(1,10) > 5){
                    Succesvol = true;
                    betaling.succes = "true";
                }
            var getKaart = _context.Order.Where(w => w.BetalingNr == betaling.reference).Select(w => w.Kaart).Single();
            int[] kaarten =  Array.ConvertAll(getKaart.Split(','), int.Parse);
            
            var secondArray= await programma_context.Stoel.Where (h=> kaarten.Contains(h.StoelId)).ToListAsync();
            secondArray.ForEach(x => x.Status = Succesvol);
            

            await programma_context.SaveChangesAsync();
            _context.Betaling.Add(betaling);
            await _context.SaveChangesAsync();

            return Redirect("http://frontend.localhost/Succesvol");
        }

  

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Order == null)
            {
                return NotFound();
            }
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Order?.Any(e => e.OrderId == id)).GetValueOrDefault();
        }
    }
}
