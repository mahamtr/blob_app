using blobCORE.Commands;
using blobCORE.Notifications;
using blobDATA.BlobStorage;
using MediatR;

namespace blobAPI.CommandsHandlers;

public class DeleteBlobRecordCommandHandler : IRequestHandler<DeleteBlobRecordCommand>
{
    private readonly IAzureStorageService _azureStorageService;
    private readonly IMediator _mediator;
    private readonly ILogger<DeleteBlobRecordCommandHandler> _logger;


    public DeleteBlobRecordCommandHandler(IAzureStorageService azureStorageService, IMediator mediator, ILogger<DeleteBlobRecordCommandHandler> logger)
    {
        _azureStorageService = azureStorageService;
        _mediator = mediator;
        _logger = logger;
    }

    public async Task Handle(DeleteBlobRecordCommand notification, CancellationToken cancellationToken)
    {
        try
        {
            foreach (var fileName in notification.Files)
            {
                var responseDto = await _azureStorageService.DeleteAsync(fileName);
                if (!responseDto.Error)
                {
                    _mediator.Publish(new DeletedBlobRecordNotification() { FileName = fileName });
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
        }
        
    }
}