namespace blobCORE.Entities;

public class BlobRecord : BaseEntity
{
    public string Name { get; set; }= string.Empty;
    public string Type { get; set; }= string.Empty;
    public DateTime UploadDateTime { get; set; }
    public string Uri { get; set; } = string.Empty;
    public int TimesDownloaded { get; set; } 
}