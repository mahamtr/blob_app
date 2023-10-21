using blobCORE.Entities;
using blobCORE.Queries;
using blobDATA.Database.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace blobAPI.QueriesHandlers;

public class GetAllBlobRecordsQueryHandler : IRequestHandler<GetAllBlobRecordsQuery, List<BlobRecord>>
{
    private readonly IGenericRepository<BlobRecord> _blobRecordRepository;
    private readonly ILogger<GetAllBlobRecordsQueryHandler> _logger;

    public GetAllBlobRecordsQueryHandler(IGenericRepository<BlobRecord> blobRecordRepository, ILogger<GetAllBlobRecordsQueryHandler> logger)
    {
        _blobRecordRepository = blobRecordRepository;
        _logger = logger;
    }

    public async Task<List<BlobRecord>> Handle(GetAllBlobRecordsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return await _blobRecordRepository.GetAll().ToListAsync(cancellationToken: cancellationToken);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}