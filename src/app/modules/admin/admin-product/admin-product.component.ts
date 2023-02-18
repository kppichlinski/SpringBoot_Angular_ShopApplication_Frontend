import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { startWith, switchMap } from 'rxjs';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminProductService } from './admin-product.service';
import { AdminProduct } from './model/admin-product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {

  @ViewChild(MatPaginator) pagiator!: MatPaginator;
  @ViewChild(MatTable) table !: MatTable<any>;
  displayedColumns: string[] = ["id", "image", "name", "price", "actions"];
  totalElements: number = 0;
  dataSource: AdminProduct[] = [];

  constructor(
    private adminProductService: AdminProductService,
    private dialogService : AdminConfirmDialogService
    ) { }

  ngAfterViewInit(): void {
    this.pagiator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminProductService.getProducts(this.pagiator.pageIndex, this.pagiator.pageSize);
      })
    ).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = data.content
    });
  }

  confirmDelete(element : AdminProduct) {
    this.dialogService.openConfirmDialog("Do you want to delete this product?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminProductService.delete(element.id)
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
