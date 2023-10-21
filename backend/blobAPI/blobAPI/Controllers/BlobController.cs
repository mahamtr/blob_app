using blobDATA.Services;
using Microsoft.AspNetCore.Mvc;

namespace blobAPI.Controllers;
[ApiController]
[Route("[controller]")]
public class BlobController : ControllerBase
{
    private readonly IAzureStorageService _storageService;

        public BlobController(IAzureStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpGet(nameof(Get))]
        public async Task<IActionResult> Get()
        {
            var files = await _storageService.ListAsync();

            return StatusCode(StatusCodes.Status200OK, files);
        }

        [HttpPost(nameof(Upload))]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            var response = await _storageService.UploadAsync(file);

            return response.Error == true ? StatusCode(StatusCodes.Status500InternalServerError, response.Status) : StatusCode(StatusCodes.Status200OK, response);
        }

        [HttpGet("{filename}")]
        public async Task<IActionResult> Download(string filename)
        {
            var file = await _storageService.DownloadAsync(filename);

            return file == null
                ? StatusCode(StatusCodes.Status500InternalServerError, $"File {filename} could not be downloaded.")
                :
                File(file.Content, file.ContentType, file.Name);
        }

        [HttpDelete("filename")]
        public async Task<IActionResult> Delete(string filename)
        {
            var response = await _storageService.DeleteAsync(filename);

            return StatusCode(response.Error ?
                StatusCodes.Status500InternalServerError : StatusCodes.Status200OK, response.Status);
        }
}