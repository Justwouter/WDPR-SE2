using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class ZaalContext : DbContext
{
    public ZaalContext(DbContextOptions<ZaalContext> options) : base(options) { }

    public DbSet<Zaal> Zaal { get; set; } = default!;
}
