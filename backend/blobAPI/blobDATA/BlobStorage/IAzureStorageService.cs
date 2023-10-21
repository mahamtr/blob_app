using blobCORE.DTOs;
using Microsoft.AspNetCore.Http;

namespace blobDATA.BlobStorage;

public interface IAzureStorageService
{
    Task<BlobResponseDto> UploadAsync(IFormFile file);
    Task<BlobDto> DownloadAsync(string blobFilename);
    Task<BlobResponseDto> DeleteAsync(string blobFilename);
    Task<List<BlobDto>> ListAsync();
}