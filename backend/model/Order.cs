using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Order
{   
    [Key]
    public int OrderId {get; set;} 
    public string Naam {get; set;} = null!;
    public string Email {get; set;} = null!;
    public string BetalingNr {get; set;} = null!;
    
    public string Kaart {get; set;} = null!;
}