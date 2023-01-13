using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Order
{   
    [Key]
    public int OrderId {get; set;}
    public string Naam {get; set;}
    public string Email {get; set;}
    
    public string Kaart {get; set;}
    public int BetalingNr {get; set;}
  
}