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
    public DbSet<Donatie> Donaties { get; set; } = default!;
    public DbSet<Comment> Comments { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Role>().HasData(new Role() { Id = "0", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Id = "1", Name = "Medewerker", NormalizedName = "MEDEWERKER", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Id = "2", Name = "Bezoeker", NormalizedName = "BEZOEKER", ConcurrencyStamp = Guid.NewGuid().ToString() });
        builder.Entity<Role>().HasData(new Role() { Id = "3", Name = "Donateur", NormalizedName = "DONATEUR", ConcurrencyStamp = Guid.NewGuid().ToString() });

        builder.Entity<Comment>()
                    .HasKey(c => new { c.commenter, c.datum });

        seedDatabaseUsers(builder);
    }

    public void seedDatabaseUsers(ModelBuilder builder)
    {
        //Initializes the default users in a list and per entry hashes the password and adds the user to the database.
        //This was imo the easiest way to keep this compact and expandable
        //Order is: User, Password, RoleID(Use the roles above as reference)
        var DefaultUserList = new (IUser, string, string[])[]
        {
            (new IUser() { Id = "1", UserName = "Admin", Email = "Admin@frontend.localhost", NormalizedUserName = "ADMIN", NormalizedEmail = "ADMIN@FRONTEND.LOCALHOST" , }, "Admin1!",new String[]{"1"}),
            (new IUser() { Id = "2", UserName = "Test", Email = "Test@frontend.localhost", NormalizedUserName = "TEST", NormalizedEmail = "TEST@FRONTEND.LOCALHOST" }, "String1!",new String[]{"2"}),
            (new IUser() { Id = "3", UserName = "Donnie", Email = "Donnie@frontend.localhost", NormalizedUserName = "DONNIE", NormalizedEmail = "DONNIE@FRONTEND.LOCALHOST" }, "String1!",new String[]{"2","3"}),

        };

        PasswordHasher<IUser> ph = new PasswordHasher<IUser>();
        DefaultUserList.ToList().ForEach(user =>
        {
            user.Item1.PasswordHash = ph.HashPassword(user.Item1, user.Item2);
            builder.Entity<IUser>().HasData(user.Item1);
            user.Item3.ToList().ForEach(rID => builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = rID, UserId = user.Item1.Id }));
        });
    }
}