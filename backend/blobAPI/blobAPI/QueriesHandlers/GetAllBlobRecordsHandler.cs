using blobCORE.Entities;
using blobCORE.Queries;
using blobDATA.Database.Repositories;
using MediatR;

namespace blobAPI.QueriesHandlers;

public class GetAllBlobRecordsHandler : IRequestHandler<GetAllBlobRecords, List<BlobRecord>>
{
    private readonly IGenericRepository<BlobRecord> _blobRecordRepository;

    public GetAllBlobRecordsHandler(IGenericRepository<BlobRecord> blobRecordRepository)
    {
        _blobRecordRepository = blobRecordRepository;
    }

    public async Task<List<BlobRecord>> Handle(GetAllBlobRecords request, CancellationToken cancellationToken)
    {
        return _blobRecordRepository.GetAll().ToList();
    }
}