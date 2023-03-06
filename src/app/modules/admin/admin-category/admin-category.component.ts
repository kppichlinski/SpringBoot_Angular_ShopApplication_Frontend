import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminCategoryNameDto } from '../common/dto/adminCategoryNameDto';
import { AdminCategoryService } from './admin-category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild(MatTable) table !: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "actions"];
  dataSource: Array<AdminCategoryNameDto> = [];

  constructor(
    private adminCategoryService: AdminCategoryService,
    private dialogService: AdminConfirmDialogService
    ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.adminCategoryService.getCategories()
      .subscribe(categories => this.dataSource = categories);
  }

  confirmDelete(element: AdminCategoryNameDto) {
    this.dialogService.openConfirmDialog("Do you want to delete this category?")
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.adminCategoryService.delete(element.id)
        .subscribe(() => {
          this.dataSource.forEach((value, index) => {
            if (element == value) {
              this.dataSource.splice(index, 1);
              this.table.renderRows();
            }
          })
        });
      }
    });
  }

}
