import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss',
})
export class RecordComponent {
  RecordArray: any[] = [];
  isResultLoaded = false;

  name: string = '';
  age: Number = 0;
  gender: string = '';

  currentStudentID = '';
  constructor(private http: HttpClient) {
    this.getAllRecord();
  }
  getAllRecord() {
    this.http
      .get('http://127.0.0.1:8000/api/records/index')

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.RecordArray = resultData;
      });
  }

  register() {
    let bodyData = {
      name: this.name,
      age: this.age,
      gender: this.gender,
    };

    this.http
      .post('http://127.0.0.1:8000/api/records/create', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Successfully');
        this.getAllRecord();
        this.name = '';
        this.age = 0;
        this.gender = '';
      });
  }
  setUpdate(data: any) {
    this.name = data.name;
    this.age = data.age;
    this.gender = data.gender;
    this.currentStudentID = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      id: this.currentStudentID,
      name: this.name,
      age: this.age,
      gender: this.gender,
    };

    this.http
      .put(
        'http://127.0.0.1:8000/api/records/update' ,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Updateddd');
        this.getAllRecord();
        this.currentStudentID = '';
        this.name = '';
        this.age = 0;
        this.gender = '';
      });
  }

  save() {
    if (this.currentStudentID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete('http://127.0.0.1:8000/api/records/delete' + '/' + data.id, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Deleteddd');
        this.getAllRecord();
        this.currentStudentID = '';
        this.name = '';
        this.age = 0;
        this.gender = '';
      });
  }
}
