namespace blobCORE.Entities;

public class BlobItem :BaseEntity
{
    public string Name { get; set; }
    public string Type { get; set; }
    public DateTime UploadDateTime { get; set; }
    public string Uri { get; set; }
}