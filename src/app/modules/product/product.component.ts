import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/shared/model/page';
import { Product } from './model/product';
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
  
  private getProducts(page: number, size: number) {
    this.productService.getProducts(page, size)
      .subscribe(page => this.page = page);   
  }
  
}
