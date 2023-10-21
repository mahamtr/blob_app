using blobCORE.Services;
using blobDATA.BlobStorageProvider;
using dotenv.net;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddTransient<IAzureStorageService, AzureStorageService>();
builder.Services.AddSingleton<IBlobStorageProvider,BlobStorageProvider>();
builder.Services.
// builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

DotEnv.Load(options: new DotEnvOptions(ignoreExceptions: false));


app.Run();