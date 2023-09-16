import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';
import { CartIconService } from 'src/app/modules/common/service/cart-icon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Shop";
  cartProductCounter = "";

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService
  ) { }

  ngOnInit(): void {
    this.getCountProducts();
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = String(Number(counter) > 0 ? counter : ""));
  }

  getCountProducts() {
    let cartId = Number(this.cookieService.get("cartId"));
    this.headerService.getCountProducts(cartId)
      .subscribe(counter => this.cartProductCounter = String(Number(counter) > 0 ? counter : ""));
  }
}
