using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace backend.model;

public class User : IdentityUser
{
    public string? Type { get; set; }
    public string Password { get; set; }
}