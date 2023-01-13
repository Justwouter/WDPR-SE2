using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Betaling
{   
    [Key]
    public int BetalingId {get; set;}
    public Boolean succes {get; set;}
    public int reference {get; set;}
 
    
  
}