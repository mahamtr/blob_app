# BLOB Storage Solution

Hi! This is a fun proof of concept I did in a weekend for a document library hub, where users can upload, download and share files.

## Architecture, Patterns, Stack

- .NET 7
- React v18
- Azure BlobStorage
- MSSSQL

### Backend

The backend implements CQRS, Mediator pattern, Generic Repository, and code first database approach. The API keeps record of the existing items in the blob container, by triggering notifications when a BLOB is added or deleted.

To download files, the application generate a download link that is valid for specified amount of minutes.

### Frontend

Vanilla as it can get.

## Potential Improvements

- For larger files, the application could upload in chunks.
- Another good alternative would be to upload files directly from the frontend using AzureSDK, but that would add responsability to the frontend to notify the API when a BLOB is added or deleted to keep track of the database records.
- For batch upload, the API could implement background services and take advantage of multithreading and notify the client when big BLOBs or large batches are finished uploading.

## Short video of application functionality

![Watch the video](https://youtu.be/7GuQl7dfKrA?si=q0b-1ArKoZPMO5aD/default.jpg)(https://youtu.be/7GuQl7dfKrA?si=q0b-1ArKoZPMO5aD)

## How to run

### Azure

Make sure to create your Blob Storage Account, Container and SQL server.

### Backend

Add enviroment variables by adding a .env file at root of project

```
blob_storage_key=
blob_container_name=
blob_storage_connection_string=
database_connection_string=
```

### Frontend

Add enviroment variables by adding a .env file at root of project

`REACT_APP_BACKEND_URL=`

Then just

`npm run start`
