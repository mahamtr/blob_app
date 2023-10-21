using blobCORE.Entities;
using blobCORE.Notifications;
using blobDATA.Database.Repositories;
using MediatR;

namespace blobAPI.NotificationHandlers;

public class DeletedBlobRecordNotificationHandler : INotificationHandler<DeletedBlobRecordNotification>
{

    private readonly IGenericRepository<BlobRecord> _blobRecordRepository;
    private readonly ILogger<DeletedBlobRecordNotificationHandler> _logger;


    public DeletedBlobRecordNotificationHandler(IGenericRepository<BlobRecord> blobRecordRepository, ILogger<DeletedBlobRecordNotificationHandler> logger)
    {
        _blobRecordRepository = blobRecordRepository;
        _logger = logger;
    }

    public async Task Handle(DeletedBlobRecordNotification notification, CancellationToken cancellationToken)
    {
        try
        {
            var blobRecord = _blobRecordRepository.FilterSingle(br => br.Name == notification.FileName);
            _blobRecordRepository.Delete(blobRecord);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
        }
        
    }
}