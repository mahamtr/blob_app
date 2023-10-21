using blobCORE.Entities;
using blobCORE.Notifications;
using blobDATA.Database.Repositories;
using MediatR;

namespace blobAPI.NotificationHandlers;

public class GeneratedSasUriNotificationHandler : INotificationHandler<GeneratedSasUriNotification>
{
    private readonly IGenericRepository<BlobRecord> _blobRecordRepository;
    private readonly ILogger<GeneratedSasUriNotificationHandler> _logger;

    public GeneratedSasUriNotificationHandler(IGenericRepository<BlobRecord> blobRecordRepository, ILogger<GeneratedSasUriNotificationHandler> logger)
    {
        _blobRecordRepository = blobRecordRepository;
        _logger = logger;
    }

    public async Task Handle(GeneratedSasUriNotification notification, CancellationToken cancellationToken)
    {
        try
        {
            var blobRecord = _blobRecordRepository.FilterSingle(br => br.Name == notification.FileName);
            blobRecord.TimesDownloaded += 1;
            _blobRecordRepository.Update(blobRecord);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
        }
        
      
    }
}