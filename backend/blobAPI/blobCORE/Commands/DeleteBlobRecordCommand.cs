using MediatR;

namespace blobCORE.Commands;

public class DeleteBlobRecordCommand : IRequest
{
    public string[] Files { get; set; }
}