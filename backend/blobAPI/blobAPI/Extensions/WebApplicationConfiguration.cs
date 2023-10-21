using blobDATA.DataBaseProvider;
using blobDATA.Services;
using dotenv.net;
using Microsoft.EntityFrameworkCore;

namespace blobAPI.Extensions;

public static class WebApplicationConfiguration
{
    public static WebApplication SetupMigrations(this WebApplication webApp)
    {
        using var scope = webApp.Services.CreateScope();
        var services = scope.ServiceProvider;

        var context = services.GetRequiredService<BlobContext>();    
        context.Database.Migrate();

        return webApp;
    }
}