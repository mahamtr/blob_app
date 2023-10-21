using blobCORE.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace blobDATA.Database.Configurations;

public class BlobRecordConfiguration : IEntityTypeConfiguration<BlobRecord>
{
    public void Configure(EntityTypeBuilder<BlobRecord> builder)
    {
    }
}