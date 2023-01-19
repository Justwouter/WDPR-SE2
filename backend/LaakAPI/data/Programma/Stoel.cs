using System.ComponentModel.DataAnnotations;
public class Stoel
{
    [Key]
    public int StoelId {get;set;}
    public int Nr {get; set;}
    public string Rang {get; set;}
    public Boolean Status {get; set;} // Bezet of niet

    public int ProgrammaId {get; set;}
      


}