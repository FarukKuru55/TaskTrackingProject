using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTracking.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddDueDateToTaskItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskStatuses",
                table: "TaskStatuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskStaffs",
                table: "TaskStaffs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskItems",
                table: "TaskItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Staffs",
                table: "Staffs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Priorities",
                table: "Priorities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Departments",
                table: "Departments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.RenameTable(
                name: "TaskStatuses",
                newName: "taskstatuses");

            migrationBuilder.RenameTable(
                name: "TaskStaffs",
                newName: "taskstaffs");

            migrationBuilder.RenameTable(
                name: "TaskItems",
                newName: "taskitems");

            migrationBuilder.RenameTable(
                name: "Staffs",
                newName: "staffs");

            migrationBuilder.RenameTable(
                name: "Priorities",
                newName: "priorities");

            migrationBuilder.RenameTable(
                name: "Departments",
                newName: "departments");

            migrationBuilder.RenameTable(
                name: "Companies",
                newName: "companies");

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "taskitems",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_taskstatuses",
                table: "taskstatuses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_taskstaffs",
                table: "taskstaffs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_taskitems",
                table: "taskitems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_staffs",
                table: "staffs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_priorities",
                table: "priorities",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_departments",
                table: "departments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_companies",
                table: "companies",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_taskstatuses",
                table: "taskstatuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_taskstaffs",
                table: "taskstaffs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_taskitems",
                table: "taskitems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_staffs",
                table: "staffs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_priorities",
                table: "priorities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_departments",
                table: "departments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_companies",
                table: "companies");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "taskitems");

            migrationBuilder.RenameTable(
                name: "taskstatuses",
                newName: "TaskStatuses");

            migrationBuilder.RenameTable(
                name: "taskstaffs",
                newName: "TaskStaffs");

            migrationBuilder.RenameTable(
                name: "taskitems",
                newName: "TaskItems");

            migrationBuilder.RenameTable(
                name: "staffs",
                newName: "Staffs");

            migrationBuilder.RenameTable(
                name: "priorities",
                newName: "Priorities");

            migrationBuilder.RenameTable(
                name: "departments",
                newName: "Departments");

            migrationBuilder.RenameTable(
                name: "companies",
                newName: "Companies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskStatuses",
                table: "TaskStatuses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskStaffs",
                table: "TaskStaffs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskItems",
                table: "TaskItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Staffs",
                table: "Staffs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Priorities",
                table: "Priorities",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Departments",
                table: "Departments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "Id");
        }
    }
}
