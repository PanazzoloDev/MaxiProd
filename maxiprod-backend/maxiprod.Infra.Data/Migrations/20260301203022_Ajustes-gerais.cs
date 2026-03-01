using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace maxiprod.Infra.Data.Migrations
{
    public partial class Ajustesgerais : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Categories",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Categories",
                newName: "Name");
        }
    }
}
