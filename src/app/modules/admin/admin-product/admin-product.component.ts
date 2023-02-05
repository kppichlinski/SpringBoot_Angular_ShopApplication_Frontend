import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, switchMap } from 'rxjs';
import { AdminProductService } from './admin-product.service';
import { AdminProduct } from './model/admin-product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {

  @ViewChild(MatPaginator) pagiator!: MatPaginator;
  displayedColumns: string[] = ["id", "name", "price", "actions"];
  totalElements: number = 0;
  dataSource: AdminProduct[] = [];

  constructor(private adminProductService: AdminProductService) { }

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
}
