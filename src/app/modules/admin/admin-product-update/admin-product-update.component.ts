import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdateService } from './admin-product-update.service';
import { AdminProductUpdate } from './model/admin-product-update';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent {

  product!: AdminProductUpdate;
  productForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    })
  }

  getProduct() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id)
      .subscribe(product => this.mapFormValues(product));
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.savePost(id, this.productForm.value as AdminProductUpdate)
      .subscribe(product => {
        this.mapFormValues(product);
        this.snackBar.open("Product sucessfully updated", '', {duration: 3000});
      });
  }

  private mapFormValues(product: AdminProductUpdate): void {
    return this.productForm.setValue({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      currency: product.currency
    })
  }
}
