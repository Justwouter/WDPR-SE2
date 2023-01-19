using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class TheaterContext : IdentityDbContext
{
    public TheaterContext(DbContextOptions<TheaterContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Performance> Optredens { get; set; } = default!;
    public DbSet<User> Users { get; set; } = default!;
    // public DbSet<Role> Role { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Performance>().ToTable("Optredens");

        builder.Entity<Role>().HasData(new Role() { Name = "Medewerker", NormalizedName = "MEDEWERKER", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Name = "Bezoeker", NormalizedName = "BEZOEKER", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = Guid.NewGuid().ToString() });

        builder.Entity<User>().HasData(new User() { UserName = "Admin", Type = "Admin", Password = "Admin1!" });

    }


}
