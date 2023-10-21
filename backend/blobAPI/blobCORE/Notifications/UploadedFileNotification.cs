using MediatR;

namespace blobCORE.Notifications;

public class UploadedFileNotification : INotification
{
    public string FileName { get; set; } = string.Empty;
    public string? Uri { get; set; }
}