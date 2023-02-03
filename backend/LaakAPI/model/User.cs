using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace backend.model;

public class IUser : IdentityUser
{
        public string? DonatieToken {get; set;}
}