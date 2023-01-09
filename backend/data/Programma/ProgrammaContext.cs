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
    }

    public DbSet<Programma> Programma { get; set; } = default!;
}
