# blob_app

#Backend
dotnet ef migrations add init --startup-project ../blobAPI/blobAPI.csproj

System Requeriments Planning
Endpoints

    BlobController
        GetAllBlobRecords
        GetDownloadUriById
        UploadBlobRecords
        DeleteBlobRecords
        UpdateBlobRecord
        GenerateDonwloadLinkForBlobRecord(Timespan expireTime)
