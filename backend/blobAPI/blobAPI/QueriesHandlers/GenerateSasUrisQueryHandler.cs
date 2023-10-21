using blobCORE.Commands;
using blobCORE.Notifications;
using blobCORE.Queries;
using blobDATA.BlobStorage;
using MediatR;

namespace blobAPI.QueriesHandlers;

public class GenerateSasUrisQueryHandler : IRequestHandler<GenerateSasUrisQuery,List<Uri>>
{
    private readonly IAzureStorageService _azureStorageService;
    private readonly ILogger<GenerateSasUrisQueryHandler> _logger;
    private readonly IMediator _mediator;
    
    public GenerateSasUrisQueryHandler(IAzureStorageService azureStorageService, ILogger<GenerateSasUrisQueryHandler> logger, IMediator mediator)
    {
        _azureStorageService = azureStorageService;
        _logger = logger;
        _mediator = mediator;
    }

    public async Task<List<Uri>> Handle(GenerateSasUrisQuery request, CancellationToken cancellationToken)
    {
        var response = new List<Uri>();

        foreach (var fileName in request.FileNames)
        {
            try
            {
               var uri = await _azureStorageService.GenerateSasUri(fileName);
               _mediator.Publish(new GeneratedSasUriNotification(){FileName = fileName});
               response.Add(uri);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
            }
        }
        
        return response;

    }
}