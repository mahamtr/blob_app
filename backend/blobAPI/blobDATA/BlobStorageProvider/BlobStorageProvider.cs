using Azure.Storage.Blobs;
using dotenv.net;

namespace blobDATA.BlobStorageProvider;

public class BlobStorageProvider : IBlobStorageProvider
{
    private readonly BlobContainerClient _blobContainerClient;

    public BlobStorageProvider()
    {
        var envVars = DotEnv.Read();
        var blobContainerName = envVars["blob_container_name"]; 
        var blobConnectionString = envVars["blob_storage_connection_string"]; 
        _blobContainerClient =new BlobContainerClient(blobConnectionString, blobContainerName);
    }

    public BlobContainerClient GetBLobContainerClient()
    {
        return _blobContainerClient;
    }
}