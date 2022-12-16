using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class TheaterContext : IdentityDbContext{
    public TheaterContext (DbContextOptions<TheaterContext> options): base(options){}

    public DbSet<Preformance> Optredens {get;set;} = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Preformance>().ToTable("Optredens");
    }

}
