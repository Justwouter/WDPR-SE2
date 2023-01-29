using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class ProgrammaContext : DbContext
{


    public ProgrammaContext(DbContextOptions<ProgrammaContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Programma> Programma { get; set; } = default!;
    public DbSet<Stoel> Stoel { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Define the deafult programmas
        //This needs to be in a seperate list because migrations disallow the usage of a DbSet in the OnModelCreating method & We need to access these later to add Seats
        List<Programma> Startprogrammas = new List<Programma>();
        Startprogrammas.Add(new Programma() { ProgrammaId = 1, Titel = "Bo Burnham: Inside", Genre = "Cabaret", Van = DateTime.Now, Tot = DateTime.Now.AddHours(1).AddMinutes(27), Zaal = 1, Image="Inside.jpg",Descriptie = "Comedian Bo Burnham shoots and performs a comedy special over the course of a year, all alone, with no crew or audience." });
        Startprogrammas.Add(new Programma() { ProgrammaId = 2, Titel = "The Mandalorian", Genre = "Komedie", Van = DateTime.Now, Tot = DateTime.Now.AddMinutes(660), Zaal = 2,Image="Mando.jpg", Descriptie = "After the defeat of the Empire at the hands of Rebel forces, a lone bounty hunter operating in the Outer Rim, away from the dominion of the New Republic, goes on many surprising and risky adventures." });
        Startprogrammas.Add(new Programma() { ProgrammaId = 3, Titel = "Avengers: Endgame", Genre = "Toneel", Van = DateTime.Now.AddHours(2), Tot = DateTime.Now.AddHours(2).AddMinutes(183), Zaal = 3,Image="https://images.pathe-thuis.nl/19174_1920x1080.jpg", Descriptie = "After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance." });

        var Programs = modelBuilder.Entity<Programma>();
        Programs.HasMany(c => c.StoelenLijst);
        Startprogrammas.ForEach(p => Programs.HasData(p));

        //Generate 20 Seats on the 1st row & 80 on the 2nd for the default programmas
        //Takes the id's of each program and multiplies them by 100 to create unique numbers. 
        //Don't have time to fix it now but next time for the love of god make the combination of StoelId AND ProgrammaId unique
        //Works best if the default programmas defined above have simple, numerical ids 
        var Seats = modelBuilder.Entity<Stoel>();
        Startprogrammas.ToList().ForEach(programma => Enumerable.Range((1 + ((programma.ProgrammaId-1) * 100)), 100).ToList().ForEach(i =>
        {
            Seats.HasData(new Stoel
            {
                StoelId = i,
                Nr = (i - ((programma.ProgrammaId-1) * 100)),
                Rang = ((i - ((programma.ProgrammaId-1) * 100)) <= 20) ? "A" : "B",
                Status = false,
                ProgrammaId = programma.ProgrammaId
            });            
        }));


    }

}