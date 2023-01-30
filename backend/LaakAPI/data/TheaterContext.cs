using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

public class TheaterContext : IdentityDbContext
{
    public TheaterContext(DbContextOptions<TheaterContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<IUser> Gebruikers { get; set; } = default!;
    public DbSet<Donatie> Donaties {get; set;} = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Role>().HasData(new Role() { Id = "0", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Id = "1", Name = "Medewerker", NormalizedName = "MEDEWERKER", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Id = "2", Name = "Bezoeker", NormalizedName = "BEZOEKER", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Id = "3", Name = "Donateur", NormalizedName = "DONATEUR", ConcurrencyStamp = Guid.NewGuid().ToString() });


        seedDatabaseUsers(builder);


    }

    public void seedDatabaseUsers(ModelBuilder builder)
    {
        //Default very secure admin account
        var defaultAdmin = new IUser() { Id = "1", UserName = "Admin", Email = "Admin@frontend.localhost", NormalizedUserName = "ADMIN", NormalizedEmail = "ADMIN@FRONTEND.LOCALHOST" };
        PasswordHasher<IUser> ph = new PasswordHasher<IUser>();
        defaultAdmin.PasswordHash = ph.HashPassword(defaultAdmin, "Admin1!");

        builder.Entity<IUser>().HasData(defaultAdmin);

        //Temporary mark the admin account as a "Medewerker" instead of "Admin"
        builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "1",
            UserId = "1"
        });

    }
}