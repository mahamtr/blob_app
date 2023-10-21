using MediatR;

namespace blobCORE.Notifications;

public class GeneratedSasUriNotification : INotification
{
    public string FileName { get; set; } = string.Empty;
}