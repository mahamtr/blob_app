using blobCORE.Commands;
using blobCORE.Notifications;
using blobDATA.BlobStorage;
using MediatR;

namespace blobAPI.CommandsHandlers;

public class UploadFilesCommandHandler : IRequestHandler<UploadFilesCommand>
{
    private readonly IAzureStorageService _azureStorageService;
    private readonly IMediator _mediator;
    private readonly ILogger<UploadFilesCommandHandler> _logger;



    public UploadFilesCommandHandler(IAzureStorageService azureStorageService, IMediator mediator, ILogger<UploadFilesCommandHandler> logger)
    {
        _azureStorageService = azureStorageService;
        _mediator = mediator;
        _logger = logger;
    }

    public async Task Handle(UploadFilesCommand notification, CancellationToken cancellationToken)
    {
        foreach (var file in notification.Files)
        {
            try
            {
                var blobResponse = await _azureStorageService.UploadAsync(file);
                await _mediator.Publish(new UploadedFileNotification {FileName = file.FileName,Uri = blobResponse.Blob.Uri}, cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
            }
        }
    }
}