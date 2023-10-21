using Azure.Storage.Blobs;

namespace blobDATA.BlobStorageProvider;

public interface IBlobStorageProvider
{
    BlobContainerClient GetBLobContainerClient();
}