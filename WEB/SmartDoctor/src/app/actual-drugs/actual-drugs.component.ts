import {Component, OnInit, ViewChild} from '@angular/core';
import {Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-actual-drugs',
  templateUrl: './actual-drugs.component.html',
  styleUrls: ['./actual-drugs.component.css']
})
export class ActualDrugsComponent implements OnInit {
  // @ViewChild('exampleModal') myModal;
  patient: Patient;
  // declare;
  // var;
  // $: any;
  showModal: boolean;
  drugName: string = '';
  showAddDrug1Modal: boolean;
  newDrugName: string = '';
  drugTime: Date = null;

  constructor(private doctorService: DoctorService) {
  }

  openModel() {
    // this.myModal.on('shown.bs.modal', function () {
    // $('#myInput').trigger('focus')
    console.log('pokus o otvorenie modalu');
    // });
    // this.myModal.nativeElement.className = 'modal fade show';
  }

  // showModal(): void {
  //   $('#myModal').modal('show');
  // }
  //
  // sendModal(): void {
  //   //do something here
  //   this.hideModal();
  // }
  //
  // hideModal(): void {
  //   document.getElementById('close-modal').click();
  // }

  onClick(name) {
    this.drugName = name;
    this.drugTime = null;
    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  addTime() {
    console.log(this.drugTime.getHours() + ':' + this.drugTime.getMinutes());
    console.log(this.drugName);
    this.doctorService.addDrugTimeObservable(this.drugName, this.drugTime.getHours() + ':' + this.drugTime.getMinutes()).subscribe(
      (data: string) => {
        console.log(data);
      }, // success path
      error => console.log(JSON.stringify(error)) // error path
    );
    this.hide();
    this.showModal = false;
    this.refreshDrugs();
  }

  onClickAddNewDrug() {
    this.newDrugName = '';
    this.showAddDrug1Modal = true;
  }

  //Bootstrap Modal Close event
  hideAddNewDrug() {
    this.showAddDrug1Modal = false;
  }

  addNewDrug() {
    this.doctorService.addNewDrugObservable(this.newDrugName).subscribe(
      (data: string) => {
        console.log(data);
      }, // success path
      error => console.log(JSON.stringify(error)) // error path
    );
    this.hideAddNewDrug();
    this.refreshDrugs();
  }

  removeDrug(name: string) {
    this.doctorService.removeDrugObservable(name).subscribe(
      (data: string) => {
        console.log(data);
      }, // success path
      error => console.log(JSON.stringify(error)) // error path
    );
    this.refreshDrugs();
  }

  refreshDrugs() {
    this.doctorService.refreshUserData(this).subscribe((m: {}) => {
      if (m == this) {
        // callback();
        // items= items.slice();
        // this.patients=this.patients.slice();
        this.patient = this.doctorService.getSavedPatient();

        // this.ngOnInit();
      }
    });
  }


  ngOnInit() {
    this.patient = this.doctorService.getSavedPatient();
  }

}
