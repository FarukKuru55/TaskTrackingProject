using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTracking.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class StaffCompanyRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_taskstaffs_StaffId",
                table: "taskstaffs",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_taskstaffs_TaskItemId",
                table: "taskstaffs",
                column: "TaskItemId");

            migrationBuilder.CreateIndex(
                name: "IX_taskitems_CompanyId",
                table: "taskitems",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_taskitems_PriorityId",
                table: "taskitems",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_taskitems_TaskStatusId",
                table: "taskitems",
                column: "TaskStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_taskitems_companies_CompanyId",
                table: "taskitems",
                column: "CompanyId",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_taskitems_priorities_PriorityId",
                table: "taskitems",
                column: "PriorityId",
                principalTable: "priorities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_taskitems_taskstatuses_TaskStatusId",
                table: "taskitems",
                column: "TaskStatusId",
                principalTable: "taskstatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_taskstaffs_staffs_StaffId",
                table: "taskstaffs",
                column: "StaffId",
                principalTable: "staffs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_taskstaffs_taskitems_TaskItemId",
                table: "taskstaffs",
                column: "TaskItemId",
                principalTable: "taskitems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_taskitems_companies_CompanyId",
                table: "taskitems");

            migrationBuilder.DropForeignKey(
                name: "FK_taskitems_priorities_PriorityId",
                table: "taskitems");

            migrationBuilder.DropForeignKey(
                name: "FK_taskitems_taskstatuses_TaskStatusId",
                table: "taskitems");

            migrationBuilder.DropForeignKey(
                name: "FK_taskstaffs_staffs_StaffId",
                table: "taskstaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_taskstaffs_taskitems_TaskItemId",
                table: "taskstaffs");

            migrationBuilder.DropIndex(
                name: "IX_taskstaffs_StaffId",
                table: "taskstaffs");

            migrationBuilder.DropIndex(
                name: "IX_taskstaffs_TaskItemId",
                table: "taskstaffs");

            migrationBuilder.DropIndex(
                name: "IX_taskitems_CompanyId",
                table: "taskitems");

            migrationBuilder.DropIndex(
                name: "IX_taskitems_PriorityId",
                table: "taskitems");

            migrationBuilder.DropIndex(
                name: "IX_taskitems_TaskStatusId",
                table: "taskitems");
        }
    }
}
