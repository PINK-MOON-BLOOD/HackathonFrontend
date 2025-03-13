import { Component, OnInit } from '@angular/core';
import { DaltonizmService } from '../daltonizm.service';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-choose-restore',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './choose-restore.component.html',
  styleUrl: './choose-restore.component.css'
})
export class ChooseRestoreComponent implements OnInit{

  selectedClass: any = {};

  constructor(private daltonizmService : DaltonizmService){}

  ngOnInit(): void {
    this.daltonizmService.selectedClass$.subscribe( selectedClass =>{
      this.selectedClass = selectedClass;
    });
  }


}
