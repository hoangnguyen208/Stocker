using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.UserId, p.StockId }));
            builder.Entity<Portfolio>()
                .HasOne(u => u.User)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(u => u.UserId);
            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(u => u.StockId);

            foreach (var entity in builder.Model.GetEntityTypes())
            {
                if (entity.GetTableName()!.StartsWith("AspNet"))
                {
                    // Replace table names
                    entity.SetTableName(entity.GetTableName()!.Substring(6));
                }
            }
        }
    }
}