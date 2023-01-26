using backend.model;
using backend.Service;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class DonatieDTO {
    [Required]
    public string Email {get; set;}
    [Required]
    public int Hoeveelheid {get; set;}
    [Required]
    public string Naam {get; set;}
}

[Route("api/[controller]")]
[ApiController]
public class DonatieController : ControllerBase
{
    private readonly TheaterContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public DonatieController(TheaterContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost("DonatieListener")]
    public async Task<IActionResult> DonatieListener(DonatieDTO donatie){
        if (donatie == null) {
            return BadRequest();
        }
        await _context.AddAsync(new Donatie
        {
            Email = donatie.Email,
            Hoeveelheid = donatie.Hoeveelheid,
            Naam = donatie.Naam
        });
        await _context.SaveChangesAsync();

        var totaal = _context.Donaties.Where(_donatie => _donatie.Email == donatie.Email && _donatie.Datum > DateTime.Now.AddDays(-365)).Sum(_donatie => _donatie.Hoeveelheid);
        if (totaal >= 1000)
        {
            var user = await _userManager.FindByEmailAsync(donatie.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            await _userManager.AddToRoleAsync(user, "Donateur");
        }
        return Ok();
    }    
}