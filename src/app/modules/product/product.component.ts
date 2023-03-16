import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/modules/common/model/page';
import { Product } from '../common/model/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  page!: Page<Product>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts(0, 10);   
  }

  onPageEvent(event: PageEvent) {
    this.getProducts(event.pageIndex, event.pageSize);   
  }
  
  private getProducts(pageNumber: number, pageSize: number) {
    this.productService.getProducts(pageNumber, pageSize)
      .subscribe(dataSource => this.page = dataSource);   
  }
  
}
