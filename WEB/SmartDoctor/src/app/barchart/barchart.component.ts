import {Component, Input, OnInit} from '@angular/core';
import {BarchartData, BarchartdataWithLabelJSON, DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  error: any;
  data: BarchartdataWithLabelJSON;
  labels: string[] = [];
  @Input() label: string;
  @Input() pointHighlightStroke: string;
  @Input() backgroundColor: string;
  @Input() borderColor: string;
  public options = {
    responsive: true,
    responsiveAnimationDuration: 0,
    animation: {duration: 0},
    // animation: false,
    showTooltips: false,
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }

  };

  constructor(private doctorService: DoctorService) {
  }

  barChartType = 'bar';
  barChartLegend = true;

  public bcd = [];

  showBarchartData() {
    let temp = {
      'data': [
        '2',
        '4',
        '6',
        '3',
        '4',
        '5',
        '7',
      ],
      'labels': [
        '9:00:00 AM',
        '10:00:00 AM',
        '11:00:00 AM',
        '12:00:00 PM',
        '1:00:00 PM',
        '2:00:00 PM',
        '3:00:00 PM',
      ]
    };
    this.data = {
      data: temp.data,
      label: this.label,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      pointHighlightStroke: this.pointHighlightStroke
    };
    console.log('ta json: ' + JSON.stringify(this.data));
    this.bcd.push(JSON.parse(JSON.stringify(this.data)));
    this.labels = temp.labels;
    // console.log('labels from dataL ' + data.labels);
  }

  ngOnInit() {
    this.showBarchartData();
  }
}
