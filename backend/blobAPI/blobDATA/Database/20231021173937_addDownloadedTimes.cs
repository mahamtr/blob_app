using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace blobDATA.Database
{
    /// <inheritdoc />
    public partial class addDownloadedTimes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimesDownloaded",
                table: "BlobRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimesDownloaded",
                table: "BlobRecords");
        }
    }
}
