import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {DoctorService} from '../services/doctor.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-examination-detail-page',
  templateUrl: './examination-detail-page.component.html',
  styleUrls: ['./examination-detail-page.component.css']
})
export class ExaminationDetailPageComponent implements OnInit {
  isPatient: boolean = false;
  examination: {};
  patient: {};
  showModal: boolean;
  @Input() inputData: string;
  record: {} = null;


  constructor(private dataService: DataService, private doctorService: DoctorService) {
  }

  onClick() {

    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  saveRecord(examination) {
    let clone = Object.assign({}, examination);
    if (clone['doctordata']) {
      delete clone['doctordata'];
    }

    console.log('toto je clone: ' + JSON.stringify(clone));
    let recordId = null;
    if (examination['record']) {
      recordId = examination['record'];
    }
    this.doctorService.editRecordObservable(this.patient['_id'], clone, this.inputData, recordId).subscribe(
      (data: string) => {
        recordId = data['recordId'];
        this.getRecord();
        console.log(JSON.stringify(data));
      },
      error => console.log(JSON.stringify(error))
    );
    this.hide();
  }

  getRecord() {
    this.record = null;
    if (this.examination['record']) {
      this.doctorService.getRecordObservable(this.examination['record']).subscribe(
        (data: string) => {
          this.record = data;
          console.log(JSON.stringify(data));
        },
        error => console.log(JSON.stringify(error))
      );
    }
  }

  public generatePdf() {
    var data = document.getElementById('topdf');
    html2canvas(data).then(canvas => {
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.setFontSize(32);
      pdf.text('Smart Doctor', 10, 10);
      pdf.setFontSize(16);
      pdf.text('2019 © Oleksandra Musatkina', 10, 15);
      pdf.setLineWidth(2);
      pdf.line(2, 25, imgWidth, 25);
      let position = 30;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.patient['firstname'] + '_' + this.patient['surname'] + '.pdf');
    });
  }

  ngOnInit() {
    this.isPatient = this.doctorService.isPatient();
    this.dataService.data.subscribe(message => {
      this.patient = message.patient;
      this.examination = message.examination;
      console.log('toto je examination: ' + JSON.stringify(this.examination));
      this.getRecord();
    });

    // if (this.isPatient) {
    //   this.patient = this.doctorService.getSavedPatient();
    //   this.dataService.data.subscribe(message => this.doctor = message);
    //
    // } else {
    //   this.doctor = this.doctorService.getSavedDoctor();
    //   this.dataService.data.subscribe(message => this.patient = message);
    //
    // }
  }
}
