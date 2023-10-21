using blobCORE.Entities;
using blobCORE.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace blobAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class BlobController : ControllerBase
{
    private readonly IMediator _mediator;

    public BlobController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("GetAllBlobRecords")]
    public async Task<List<BlobRecord>> Get()=> await _mediator.Send(new GetAllBlobRecords());

    // [HttpPost("UploadBlobRecords")]
    // public async Task<int> Upload(IFormFile file)
    // {
    //     // var response = await _storageService.UploadAsync(file);
    //
    //     return 1;
    //
    // }
    //
    // [HttpGet("GetDownloadUriById")]
    // public async Task<string> Download(Guid Id)
    // {
    //     return "";
    // }
    //
    // [HttpDelete("filename")]
    // public async Task<IActionResult> Delete(string filename)
    // {
    //     var response = await _storageService.DeleteAsync(filename);
    //
    //     return StatusCode(response.Error ? StatusCodes.Status500InternalServerError : StatusCodes.Status200OK,
    //         response.Status);
    // }
}