using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

//[Owned]
public class Timestamp{

    public int Id {get;set;}
    public DateTime savedDate {get;set;}
    public int? locationID {get;set;}
}