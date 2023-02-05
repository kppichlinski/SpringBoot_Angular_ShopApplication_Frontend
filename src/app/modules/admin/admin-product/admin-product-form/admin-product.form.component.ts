import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-admin-product-form',
    template: `
    <div [formGroup]="parentForm" fxLayout="column">
        <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput placeholder="Product name" formControlName="name">
        </mat-form-field>

        <mat-form-field>
            <mat-label>Description</mat-label>
            <textarea matInput rows="20" placeholder="Product description" formControlName="description"></textarea>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Category</mat-label>
            <input matInput placeholder="Product category" formControlName="category">
        </mat-form-field>

        <mat-form-field>
            <mat-label>Price</mat-label>
            <input matInput placeholder="Product price" formControlName="price">
        </mat-form-field>

        <mat-form-field>
            <mat-label>Currency</mat-label>
            <input matInput placeholder="Product currency" formControlName="currency">
        </mat-form-field>

        <div fxLayoutAlign="end">
            <button mat-flat-button color="primary">Save</button>
        </div>
    </div>
    `,
})
export class AdminProductFormComponent implements OnInit {

    @Input() parentForm!: FormGroup; 

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}