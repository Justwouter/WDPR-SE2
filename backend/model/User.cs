using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace backend.model;

public class User : IdentityUser
{
    public int Id { get; set; }
    [Required(ErrorMessage = "email is noodzakelijk")]
    public string Email { get; set; }
    [Required(ErrorMessage = "wachtwoord is noodzakelijk")]
    public string Password { get; set; }
}