import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './cart.service';
import { CookieService } from 'ngx-cookie-service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CartIconService } from '../common/service/cart-icon.service';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartSummaryItem } from '../common/model/cart/cartSummaryItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  formGroup!: FormGroup;
  summary: CartSummary | undefined;
  isProductAdded = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartIconService: CartIconService
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.queryParams['productId']);
    if (id > 0) {
      this.addToCart(id);
    } else {
      this.getCart();
    }

    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  getCart() {
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.cartService.getCart(cartId)
        .subscribe(summary => {
          this.summary = summary;
          this.patchFormItems();
          this.cartIconService.cartChanged(summary.items.length);
        });
    }
  }

  addToCart(id: number) {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addToCart(cartId, { productId: id, quantity: 1 })
      .subscribe(summary => {
        this.summary = summary;
        this.patchFormItems();
        this.cartIconService.cartChanged(summary.items.length);
        this.cookieService.delete("cartId");
        this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3));
        this.router.navigate(["/cart"]);
      });
  }

  patchFormItems() {
    let formItems = <FormArray>this.formGroup.get("items");
    this.summary?.items.forEach(item => {
      formItems.push(this.formBuilder.group({
        id: [item.id],
        quantity: [item.quantity],
        product: [item.product],
        lineValue: [item.lineValue]
      }));
    })
  }

  expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  submit() {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.updateCart(cartId, this.mapToRequestListDto())
      .subscribe(summary => {
        this.summary = summary;
        this.formGroup.get("items")?.setValue(summary.items);
      });
  }

  mapToRequestListDto() {
    let items: Array<CartSummaryItem> = this.formGroup.get("items")?.value;
    return items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
  }

  back() {
    this.router.navigate(["/products"]);
  }

  deleteItem(id: number) {
    this.cartService.deleteCartItem(id)
      .subscribe(() => this.ngOnInit());
  }

  get items() {
    return (<FormArray>this.formGroup.get("items")).controls;
  }
}
