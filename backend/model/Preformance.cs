public class Preformance{
    public int Id {get;set;}
    public Timestamp runtimeFrom {get;set;} = null!;
    public Timestamp runtimeTo {get;set;} = null!;
    public List<Timestamp> plannedShowings {get;set;} = null!;

    //Artiesten & andere info hier!

}