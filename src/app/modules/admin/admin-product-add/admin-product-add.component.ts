import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminProductUpdate } from '../admin-product-update/model/admin-product-update';
import { AdminProductAddService } from './admin-product-add.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminProductAddService: AdminProductAddService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    })
  }

  submit() {
    this.adminProductAddService.saveNewProduct(this.productForm.value as AdminProductUpdate)
      .subscribe(product => {
        this.router.navigate(["/admin/products/update", product.id])
        this.snackBar.open("Product sucessfully added", '', {duration: 3000});
      });
  }

}
