import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-admin-product-form',
    template: `
    <div [formGroup]="parentForm" fxLayout="column">
        <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput placeholder="Product name" formControlName="name">
            <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="errorMessages">
                <div *ngIf="name?.errors?.['required']">
                    Name is required
                </div>
                <div *ngIf="name?.errors?.['minlength']">
                    Name has to have at least 4 signs
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Description</mat-label>
            <textarea matInput rows="20" placeholder="Product description" formControlName="description"></textarea>
            <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="errorMessages">
                <div *ngIf="description?.errors?.['required']">
                    Description is required
                </div>
                <div *ngIf="description?.errors?.['minlength']">
                    Description has to have at least 4 signs
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Category</mat-label>
            <input matInput placeholder="Product category" formControlName="category">
            <div *ngIf="category?.invalid && (category?.dirty || category?.touched)" class="errorMessages">
                <div *ngIf="category?.errors?.['required']">
                    Category is required
                </div>
                <div *ngIf="category?.errors?.['minlength']">
                    Category has to have at least 4 signs
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Price</mat-label>
            <input matInput placeholder="Product price" formControlName="price">
            <div *ngIf="price?.invalid && (price?.dirty || price?.touched)" class="errorMessages">
                <div *ngIf="price?.errors?.['required']">
                    Price is required
                </div>
                <div *ngIf="price?.errors?.['min']">
                    Price has to be greater or equals 0
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Currency</mat-label>
            <input matInput placeholder="Product currency" formControlName="currency">
            <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)" class="errorMessages">
                <div *ngIf="currency?.errors?.['required']">
                    Currency is required
                </div> 
            </div>
        </mat-form-field>

        <div fxLayoutAlign="end">
            <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Save</button>
        </div>
    </div>
    `,
    styles: [`
        .errorMessages {
            color: red;
        }
    `]
})
export class AdminProductFormComponent {

    @Input() parentForm!: FormGroup;

    get name() {
        return this.parentForm.get("name");
    }

    get description() {
        return this.parentForm.get("description");
    }

    get category() {
        return this.parentForm.get("category");
    }

    get price() {
        return this.parentForm.get("price");
    }

    get currency() {
        return this.parentForm.get("currency");
    }
}