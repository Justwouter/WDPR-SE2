using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

    public class CastLidContext : DbContext
    {
        public CastLidContext (DbContextOptions<CastLidContext> options)
            : base(options)
        {
        }

        public DbSet<CastLid> CastLid { get; set; } = default!;
    }
