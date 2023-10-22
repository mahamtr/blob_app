using blobCORE.Commands;
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
    public async Task<List<BlobRecord>> Get()=> await _mediator.Send(new GetAllBlobRecordsQuery());

    [HttpPost("UploadBlobRecords")]
    public async Task UploadBlobRecords()
    {
        var formCollection = await Request.ReadFormAsync();
        var files = formCollection.Files.ToList();
        await _mediator.Send(new UploadFilesCommand { Files = files });
    }

    [HttpPost("GenerateSasUris/{minutes}")]
    public async Task<List<Uri>> GenerateSasUris(string[] fileNames,int minutes) => await _mediator.Send(new GenerateSasUrisQuery {FileNames = fileNames,MinutesToExpire = minutes});

    [HttpDelete("BlobRecordDelete")]
    public async Task DeleteBlobRecords(string[] fileNames) =>
        await _mediator.Send(new DeleteBlobRecordCommand { Files = fileNames });
    
}