import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Cases } from '../models/cases';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent implements OnInit {
  cases: Cases = {
    _id: '',
    name: '',
    gender: '',
    age: null,
    address: '',
    city: '',
    country: '',
    status: '',
    updated: null
  };
  isLoadingResults = true;

  constructor(private  route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params.id);
  }

  getCasesDetails(id: string){
    this.api.getCases().subscribe((data: any) => {
      this.cases = data;
      console.log(this.cases);
      this.isLoadingResults = false;
    });
  }

  deleteCases(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCases(id).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/cases']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  setColor(status: string) {
    let color: string;
    if (status === 'Positive') {
      color = 'orange-color';
    } else if (status === 'Recovered') {
      color = 'green-color';
    } else {
      color = 'red-color';
    }
    return color;
  }

}
