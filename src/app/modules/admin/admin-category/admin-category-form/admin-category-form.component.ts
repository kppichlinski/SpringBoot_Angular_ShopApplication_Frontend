import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-admin-category-form',
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
            <mat-label>Friendly URL</mat-label>
            <input matInput placeholder="Freindly URL" formControlName="slug">
            <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)" class="errorMessages">
                <div *ngIf="slug?.errors?.['required']">
                    Slug is required
                </div>
                <div *ngIf="slug?.errors?.['minlength']">
                    Slug has to have at least 4 signs
                </div>
            </div>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Description</mat-label>
            <textarea matInput rows="10" placeholder="Product description" formControlName="description"></textarea>
            <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="errorMessages">
                <div *ngIf="description?.errors?.['required']">
                    Description is required
                </div>
                <div *ngIf="description?.errors?.['minlength']">
                    Description has to have at least 4 signs
                </div>
            </div>
        </mat-form-field>

        <div fxLayoutAlign="end">
            <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Save</button>
        </div>
    `,
    styles: [`
        .errorMessages {
            color: red;
        }
    `]
})
export class AdminCategoryFormComponent {

    @Input() parentForm!: FormGroup;

    get name() {
        return this.parentForm.get("name");
    }

    get description() {
        return this.parentForm.get("description");
    }

    get slug() {
        return this.parentForm.get("slug");
    }
}
