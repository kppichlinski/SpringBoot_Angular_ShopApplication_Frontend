import { Injectable } from '@angular/core';
import { CartCommonService } from '../common/service/cart-common.service';
import { HttpClient } from '@angular/common/http';
import { CartSummary } from '../common/model/cart/cartSummary';
import { Observable } from 'rxjs';
import { OrderSummary } from './model/orderSummary';
import { OrderDto } from './model/orderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private cartCommonService: CartCommonService
  ) { }

  getCart(id: number): Observable<CartSummary> {
    return this.cartCommonService.getCart(id);
  }

  placeOrder(order: OrderDto): Observable<OrderSummary> {
    return this.http.post<OrderSummary>("/api/orders", order);
  }
}
