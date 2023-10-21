using blobCORE.BlobStorageProvider;
using blobDATA.DataBaseProvider;
using blobDATA.Services;
using dotenv.net;
using Microsoft.EntityFrameworkCore;

namespace blobAPI.Extensions;

public static class ServicesConfigurationExtension
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IAzureStorageService, AzureStorageService>();
        builder.Services.AddSingleton<IBlobStorageProvider,blobCORE.BlobStorageProvider.BlobStorageProvider>();
        var configurationString = DotEnv.Read()["database_connection_string"];
        builder.Services.AddDbContext<BlobContext>
            (c => c.UseSqlServer(configurationString));
        return builder;
    }
}