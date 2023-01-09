using Microsoft.EntityFrameworkCore;

public interface IProgrammaContext
{
    DbSet<Programma> Programma { get; set; }
}
