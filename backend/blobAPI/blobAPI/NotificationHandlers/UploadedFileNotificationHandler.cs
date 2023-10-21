using blobCORE.Entities;
using blobCORE.Notifications;
using blobDATA.Database.Repositories;
using MediatR;

namespace blobAPI.NotificationHandlers;

public class UploadedFileNotificationHandler : INotificationHandler<UploadedFileNotification>
{
    private readonly IGenericRepository<BlobRecord> _blobRepository;

    public UploadedFileNotificationHandler(IGenericRepository<BlobRecord> blobRepository)
    {
        _blobRepository = blobRepository;
    }

    public async Task Handle(UploadedFileNotification notification, CancellationToken cancellationToken)
    {
        _blobRepository.Insert(new BlobRecord()
        {
            Name = notification.FileName,
            Type = Path.GetExtension(notification.FileName),
            UploadDateTime = DateTime.UtcNow,
            Uri = notification.Uri,
            TimesDownloaded = 0
        });
    }
}