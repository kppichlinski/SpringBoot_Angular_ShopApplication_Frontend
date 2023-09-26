import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-stats',
  templateUrl: './admin-order-stats.component.html',
  styleUrls: ['./admin-order-stats.component.scss']
})
export class AdminOrderStatsComponent implements AfterViewInit {
  
  private data = {
    labels: [1, 2, 3, 4],
    datasets: [
      {
        label: 'Zamówienia',
        data: [],
        borderColor: '#FF3F7C',
        backgroundColor: '#FF7A9F',
        order: 1,
        yAxisID: 'y1'
      },
      {
        label: 'Sprzedaż',
        data: [],
        borderColor: '#0088FF',
        backgroundColor: '#00A1FF ',
        type: 'line',
        order: 0,
        yAxisID: 'y2'
      }
    ]
  } as ChartData;

  @ViewChild("stats") private stats!: ElementRef;
  chart!: Chart;
  ordersCount: number = 0;
  salesSum: number = 0;

  constructor(private adminOrderService: AdminOrderService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.setupChart();
    this.getSalesStats();
  }

  setupChart() {
    this.chart = new Chart(this.stats.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sale chart'
          }
        },
        scales: {
          y1: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',
                // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }
        }
      }
    });
  }

  getSalesStats() {
    this.adminOrderService.getOrderStats()
      .subscribe(stats => {
        this.data.labels = stats.labels;
        this.data.datasets[0].data = stats.orders;
        this.data.datasets[1].data = stats.sales;
        this.ordersCount = stats.orders.reduce((acc: number, value: number) => acc + value);
        this.salesSum = stats.sales.reduce((acc: number, value: number) => acc + value);
        this.chart.update();
      });
  }
}
