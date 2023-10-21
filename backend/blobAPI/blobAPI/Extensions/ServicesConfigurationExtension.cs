using blobDATA.BlobStorage;
using blobDATA.Database;
using blobDATA.Database.Repositories;
using blobDATA.DataBaseProvider;
using dotenv.net;
using Microsoft.EntityFrameworkCore;

namespace blobAPI.Extensions;

public static class ServicesConfigurationExtension
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IAzureStorageService, AzureStorageService>();
        builder.Services.AddScoped(typeof(IGenericRepository <> ), typeof(GenericRepository <> ));  
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

        var configurationString = DotEnv.Read()["database_connection_string"];
        builder.Services.AddDbContext<BlobContext>
            (c => c.UseSqlServer(configurationString));
        return builder;
    }
}