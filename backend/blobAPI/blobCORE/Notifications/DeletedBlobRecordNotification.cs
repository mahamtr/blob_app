using MediatR;

namespace blobCORE.Notifications;

public class DeletedBlobRecordNotification : INotification
{
    public string FileName { get; set; } = string.Empty;
}