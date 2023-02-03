using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class OrderContext : DbContext
{


    public OrderContext(DbContextOptions<OrderContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Order> Order { get; set; } = default!;
    public DbSet<Betaling> Betaling { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<Order>()
        // .HasMany(c => c.Betaling);
    }

}

