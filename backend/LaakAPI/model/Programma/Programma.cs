using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Programma
{   
    [Key]
    public int ProgrammaId {get; set;}
    public string Titel {get; set;} = null!;
    public string Genre {get; set;} = null!;
    public DateTime Van {get; set;}
    public DateTime Tot {get; set;}
    public string Descriptie {get;set;} = null!;
    public int Zaal {get; set;}
    public ICollection<Stoel> StoelenLijst {get;set;} = null!;
    public string? Image {get;set;}
}