using System.ComponentModel.DataAnnotations.Schema;

public class Performance{
    public int Id {get;set;}
    public String name {get;set;} = null!;
    public String? discription {get;set;}
    //public int runtime {get;set;} //How long a performance will take in minutes.
    public DateTime startDate {get;set;} //When the first performance will be performed.
    public DateTime endDate {get;set;} //When the last performance will be performed.
    //public List<Timestamp> plannedShowings {get;set;} = new List<Timestamp>(); //When the performance will be performed. This sorta makes start/end obsolete.

    //Artiesten & andere info hier!

}