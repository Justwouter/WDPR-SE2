using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Betaling
{   
    [Key]
    public int BetalingId {get; set;}
    public string? account {get; set;}
    public string succes {get; set;} = null!;
    public string? reference {get; set;}


 
    
  
}