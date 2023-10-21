using blobCORE.Entities;
using Microsoft.EntityFrameworkCore;

namespace blobDATA.DataBaseProvider;

public class BlobContext : DbContext
{
    public BlobContext(DbContextOptions<BlobContext> options): base(options)
    {
    }
    public DbSet<BlobRecord> BlobRecords { get; set; }
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(BlobContext).Assembly);
    }

}