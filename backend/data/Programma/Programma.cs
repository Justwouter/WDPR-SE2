using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Programma
{   
    [Key]
    public int ProgrammaId {get; set;}
    public string Titel {get; set;}
    public DateTime Van {get; set;}
    public DateTime Tot {get; set;}
    public string Descriptie {get;set;}
    //public List<Lid> LedenLijst {get; set;}
    public int Zaal {get; set;}
    public ICollection<Stoel> StoelenLijst {get;set;}
    
  
}