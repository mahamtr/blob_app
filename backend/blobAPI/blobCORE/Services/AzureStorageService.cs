using Azure;
using Azure.Storage.Blobs.Models;
using blobDATA.BlobStorageProvider;
using blobDATA.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace blobCORE.Services;

public class AzureStorageService : IAzureStorageService
{
    private readonly IBlobStorageProvider _blobStorageProvider;
    private readonly ILogger<AzureStorageService> _logger;

    public AzureStorageService(ILogger<AzureStorageService> logger, IBlobStorageProvider blobStorageProvider)
    {
        _logger = logger;
        _blobStorageProvider = blobStorageProvider;
    }

    public async Task<BlobResponseDto> UploadAsync(IFormFile file)
    {
        BlobResponseDto response = new();

        var container = _blobStorageProvider.GetBLobContainerClient();
        try
        {
            var client = container.GetBlobClient(file.FileName);

            await using (var data = file.OpenReadStream())
            {
                await client.UploadAsync(data);
            }

            response.Status = $"File {file.FileName} Uploaded Successfully";
            response.Error = false;
            response.Blob.Uri = client.Uri.AbsoluteUri;
            response.Blob.Name = client.Name;
        }
        catch (RequestFailedException ex)
            when (ex.ErrorCode == BlobErrorCode.BlobAlreadyExists)
        {
            _logger.LogError(
                $"File with name {file.FileName} already exists in container.'");
            response.Status =
                $"File with name {file.FileName} already exists. Please use another name to store your file.";
            response.Error = true;
            return response;
        }
        catch (RequestFailedException ex)
        {
            _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
            response.Status = $"Unexpected error: {ex.StackTrace}. Check log with StackTrace ID.";
            response.Error = true;
            return response;
        }

        return response;
    }

    public async Task<BlobDto> DownloadAsync(string blobFilename)
    {
        var client = _blobStorageProvider.GetBLobContainerClient();

        try
        {
            var file = client.GetBlobClient(blobFilename);

            // Check if the file exists in the container
            if (await file.ExistsAsync())
            {
                var data = await file.OpenReadAsync();
                var blobContent = data;

                var content = await file.DownloadContentAsync();

                var name = blobFilename;
                var contentType = content.Value.Details.ContentType;

                return new BlobDto { Content = blobContent, Name = name, ContentType = contentType };
            }
        }
        catch (RequestFailedException ex)
            when (ex.ErrorCode == BlobErrorCode.BlobNotFound)
        {
            _logger.LogError($"File {blobFilename} was not found.");
        }

        return null;
    }

    public async Task<BlobResponseDto> DeleteAsync(string blobFilename)
    {
        var client = _blobStorageProvider.GetBLobContainerClient();

        var file = client.GetBlobClient(blobFilename);

        try
        {
            await file.DeleteAsync();
        }
        catch (RequestFailedException ex)
            when (ex.ErrorCode == BlobErrorCode.BlobNotFound)
        {
            _logger.LogError($"File {blobFilename} was not found.");
            return new BlobResponseDto { Error = true, Status = $"File with name {blobFilename} not found." };
        }

        return new BlobResponseDto { Error = false, Status = $"File: {blobFilename} has been successfully deleted." };
    }

    public async Task<List<BlobDto>> ListAsync()
    {
        var container = _blobStorageProvider.GetBLobContainerClient();

        var files = new List<BlobDto>();

        await foreach (var file in container.GetBlobsAsync())
        {
            var uri = container.Uri.ToString();
            var name = file.Name;
            var fullUri = $"{uri}/{name}";

            files.Add(new BlobDto
            {
                Uri = fullUri,
                Name = name,
                ContentType = file.Properties.ContentType
            });
        }

        return files;
    }
}