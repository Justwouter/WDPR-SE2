using backend.model;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class DonatieDTO
{
    [Required]
    public string Email { get; set; }
    [Required]
    public int Hoeveelheid { get; set; }
    [Required]
    public string Naam { get; set; }
}

public class TokenDTO
{
    public string token { get; set; }
}


[Route("api/[controller]")]
[ApiController]
public class DonatieController : ControllerBase
{
    private readonly TheaterContext _context;
    private readonly UserManager<IUser> _userManager;

    public DonatieController(TheaterContext context, UserManager<IUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost("DonatieListener")]
    public async Task<IActionResult> DonatieListener(DonatieDTO donatie)
    {
        if (donatie == null)
        {
            return BadRequest();
        }
        await _context.AddAsync(new Donatie
        {
            Id = new Guid(),
            Email = donatie.Email,
            Hoeveelheid = donatie.Hoeveelheid,
            Naam = donatie.Naam,
            Datum = DateTime.Now

        });
        await _context.SaveChangesAsync();

        var totaal = _context.Donaties.Where(_donatie => _donatie.Email == donatie.Email && _donatie.Datum > DateTime.Now.AddDays(-365)).Sum(_donatie => _donatie.Hoeveelheid);
        if (totaal >= 1000)
        {
            Console.WriteLine(donatie.Email);
            var user = await _userManager.FindByEmailAsync(donatie.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            await _userManager.AddToRoleAsync(user, "Donateur");
            return Redirect("http://frontend.localhost/DonateursPanel");
        }
        return Ok();
    }

    [HttpPost("AddToken/{id}")]
    public async Task<IActionResult> addToken(string id, [FromForm] TokenDTO tokenDTO)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return BadRequest();
        }
        user.DonatieToken = tokenDTO.token;
        await _userManager.UpdateAsync(user);
        await _context.SaveChangesAsync();
        return Redirect("http://frontend.localhost/Over-ons");
    }

    [HttpGet("checkToken/{id}")]
    public async Task<IActionResult> checkToken(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return BadRequest("User not found.");
        }
        if (user.DonatieToken == null)
        {
            return NotFound("Token not found.");
        }
        return Ok(user.DonatieToken);
    }

    [HttpGet("checkDonateur"), Authorize(Roles = "Donateur")]
    public async Task<IActionResult> checkDonateur()
    {
        return Ok();
    }

    [HttpGet, Authorize(Roles = "Medewerker")]
    public async Task<IActionResult> GetDonaties()
    {
        List<object> donatielist = new List<object>();
        foreach (Donatie donatie in await _context.Donaties.ToListAsync())
        {
            donatielist.Add(donatie);
        }
        return Ok(donatielist);
    }

    [HttpPost("Comment"), Authorize(Roles = "Donateur")]
    public async Task<IActionResult> PostDonatie(Comment comment)
    {
        if (comment == null) {
            return BadRequest("Invalid comment");
        }
        var user = await _userManager.FindByIdAsync(comment.commenter);
        if (user == null) {
            return BadRequest("User not found.");
        }
        await _context.AddAsync(new Comment
        {
            commenter = comment.commenter,
            content = comment.content,
            datum = DateTime.Now
        });
        await _context.SaveChangesAsync();
        return Ok();
    }
}