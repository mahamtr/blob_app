using Azure.Storage.Blobs.Models;
using blobCORE.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace blobDATA.DataBaseProvider.Configurations;

public class BlobRecordConfiguration : IEntityTypeConfiguration<BlobRecord>
{
    public void Configure(EntityTypeBuilder<BlobRecord> builder)
    {
    }
}