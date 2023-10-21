using Azure.Storage.Blobs.Models;
using Microsoft.EntityFrameworkCore;

namespace blobDATA.DataBaseProvider;

public class BlobContext : DbContext
{
    public DbSet<BlobItem> BlobItems { get; set; }
}