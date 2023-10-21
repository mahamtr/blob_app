using blobCORE.Entities;
using MediatR;

namespace blobCORE.Queries;

public class GetAllBlobRecordsQuery : IRequest<List<BlobRecord>>
{
    
}