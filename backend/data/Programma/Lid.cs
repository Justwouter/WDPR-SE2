public class Lid
{
    public int Id {get; set;}
    public string Naam {get; set;}
    public string? Omschrijving {get; set;}
    public string Afbeelding {get; set;} // Tijdelijk een string. Later Database voor images
    public DateOnly GeboorteD {get; set;}
}