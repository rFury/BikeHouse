import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/user.service';
import { bikeService } from '../services/bike.service';
import { AuthService } from '../services/auth.service';
import { Bike } from '../model/MotorBike.model';
import { UserModel } from '../model/user.model';
import { Accessory } from '../model/Accessory.model';
import { AccessoryService } from '../services/accessory.service';
import { OrdersService } from '../services/orders.service';
import { OrderAccessory } from '../model/OrderAccessory.model';
import { Orders } from '../model/Order.model';
import { OA } from '../model/OA.model';
interface MonthSales {
  month: string;
  sales: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Date!: Date;
  orders: OA[] = [];
  Users: UserModel[] = [];
  total: Number = 0;
  Availabe: number = 0;
  AvailabeA: number = 0;
  Sold: number = 0;
  SoldA: number = 0;
  Bikes: Bike[] = [];
  Accessories: Accessory[] = [];
  salesByMonth: MonthSales[] = [];
  constructor(
    private bikeServ: bikeService,
    private authS: AuthService,
    private UserServ: UsersService,
    private AccessoryServ: AccessoryService,
    private OrderServ: OrdersService
  ) {
    this.listBikes();
    this.listUsers();
    this.listAccessories();
    this.listOrders();
  }
  ngOnInit(): void {}

  listOrders() {
    this.OrderServ.getOrders().subscribe(
      (response) => {
        response.forEach((element) => {
          let order = new OA();
          order.UserId = element.UserId;
          order.OrderNumber = element.OrderNumber;
          order.ProductID = element.Bike;
          order.DateOfOrder = new Date(element.DateOfOrder)
            .toISOString()
            .split('T')[0];
          order.wich = 'Bike';
          this.orders.push(order);
        });
        this.OrderServ.getOrdersA().subscribe(
          (response) => {
            response.forEach((element) => {
              let order = new OA();
              order.UserId = element.UserId;
              order.OrderNumber = element.OrderNumber;
              order.ProductID = element.Accessory;
              order.Quantity = element.QuantityOrdered;
              order.DateOfOrder = new Date(element.DateOfOrder)
                .toISOString()
                .split('T')[0];
              order.wich = 'Accessory';
              this.orders.push(order);
            });
            this.orders.sort(
              (a, b) =>
                new Date(a.DateOfOrder).getTime() -
                new Date(b.DateOfOrder).getTime()
            );
            this.getSalesByMonth(); // Call getSalesByMonth after orders are populated
          },
          (error) => {
            console.log(error.message);
          }
        );
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  getName(id: number) {
    return this.Users.find((user) => user.UserId == id)?.UserName;
  }

  getProductName(id: number, ch: string) {
    if (ch == 'Accessory') {
      return this.Accessories.find((Acc) => Acc.AccessoryId == id)?.Name;
    } else {
      return this.Bikes.find((Bikes) => Bikes.BikeId == id)?.Name;
    }
  }

  listBikes() {
    this.bikeServ.getBikes().subscribe(
      (response) => {
        this.Bikes = response;
        this.Bikes.forEach((element) => {
          if (element.Status == 'Sold') {
            this.Sold++;
            this.total = Number(this.total) + Number(element.Price);
          } else if (element.Status == 'On Sale') {
            this.Availabe++;
          }
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  listAccessories() {
    this.AccessoryServ.getAccessories().subscribe(
      (response) => {
        this.Accessories = response;
        this.Accessories.forEach((element) => {
          if (element.Status == 'Out Of Stock') {
            this.SoldA++;
          } else if (element.Status == 'On Sale') {
            this.AvailabeA++;
          }
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  listUsers() {
    this.UserServ.getUsers().subscribe(
      (response) => {
        this.Users = response;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  async getSalesByMonth() {
    const salesByMonth: { [month: string]: number } = {};

    for (const order of this.orders) {
      const orderDate = new Date(order.DateOfOrder);
      const month = `${orderDate.getFullYear()}-${(orderDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
      const monthName = this.getMonthName(orderDate.getMonth()); // Get month name
      const formattedMonth = `${monthName} ${orderDate.getFullYear()}`;

      let itemPrice: number = 0;

      if (order.wich == 'Bike') {
        const bike = await this.bikeServ
          .getBikeById(String(order.ProductID))
          .toPromise();
        if (bike != undefined) {
          itemPrice = bike.Price.valueOf();
        }
      } else if (order.wich == 'Accessory') {
        const accessory = await this.AccessoryServ.getAccessoryById(
          String(order.ProductID)
        ).toPromise();
        if (accessory != undefined) {
          itemPrice = accessory.Price.valueOf();
        }
      } else {
        continue;
      }

      if (salesByMonth[formattedMonth]) {
        salesByMonth[formattedMonth] += itemPrice * order.Quantity;
      } else {
        salesByMonth[formattedMonth] = itemPrice * order.Quantity;
      }
    }

    this.salesByMonth = Object.keys(salesByMonth).map((month) => ({
      month: month,
      sales: salesByMonth[month],
    }));
  }

  getMonthName(monthNumber: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthNumber];
  }

  LogDate(){
    this.OrderServ.SearchByDate(this.Date).subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
