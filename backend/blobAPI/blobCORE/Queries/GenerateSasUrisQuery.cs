using MediatR;

namespace blobCORE.Queries;

public class GenerateSasUrisQuery : IRequest<List<Uri>>
{
    public string[] FileNames { get; set; }
    public int MinutesToExpire { get; set; }
}