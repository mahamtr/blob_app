using MediatR;
using Microsoft.AspNetCore.Http;

namespace blobCORE.Commands;

public class UploadFilesCommand : IRequest
{
    public List<IFormFile> Files { get; set; } = new List<IFormFile>();
}