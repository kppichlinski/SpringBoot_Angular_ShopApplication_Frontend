import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from './order.service';
import { CartSummary } from '../common/model/cart/cartSummary';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderSummary } from './model/orderSummary';
import { OrderDto } from './model/orderDto';
import { InitData } from './model/initData';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cartSummary: CartSummary | undefined;
  formGroup!: FormGroup;
  orderSummary!: OrderSummary;
  initData!: InitData;

  private statuses = new Map<string, string>([
    ["NEW", "New"]
  ]);

  constructor(
    private cookieService: CookieService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.chekCartEmpty();
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      shipment: ['', Validators.required],
    });
    this.getInitData();
  }

  chekCartEmpty() {
    let cartId = Number(this.cookieService.get("cartId"));
    this.orderService.getCart(cartId)
      .subscribe(summary => this.cartSummary = summary)
  }

  submit() {
    console.log(this.formGroup.get("shipment")?.value);
    if (this.formGroup.valid) {
      this.orderService.placeOrder({
        firstname: this.formGroup.get('firstname')?.value,
        lastname: this.formGroup.get('lastname')?.value,
        street: this.formGroup.get('street')?.value,
        zipcode: this.formGroup.get('zipcode')?.value,
        city: this.formGroup.get('city')?.value,
        email: this.formGroup.get('email')?.value,
        phone: this.formGroup.get('phone')?.value,
        cartId: Number(this.cookieService.get("cartId")),
        shipmentId: Number(this.formGroup.get("shipment")?.value.id)
      } as OrderDto)
        .subscribe(orderSummary => {
          this.orderSummary = orderSummary;
          this.cookieService.delete("cartId");
        });
    }
  }

  getInitData() {
    this.orderService.getInitData()
      .subscribe(initData => {
        this.initData = initData;
        this.setDefaultShipment();
      });
  }

  setDefaultShipment() {
    this.formGroup.patchValue({
      "shipment": this.initData.shipments
        .filter(shipment => shipment.defaultShipment === true)[0]
    });
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }

  get firstname() {
    return this.formGroup.get("firstname");
  }

  get lastname() {
    return this.formGroup.get("lastname");
  }

  get street() {
    return this.formGroup.get("street");
  }

  get zipcode() {
    return this.formGroup.get("zipcode");
  }

  get city() {
    return this.formGroup.get("city");
  }

  get email() {
    return this.formGroup.get("email");
  }

  get phone() {
    return this.formGroup.get("phone");
  }

  get shipment() {
    return this.formGroup.get("shipment");
  }
}
