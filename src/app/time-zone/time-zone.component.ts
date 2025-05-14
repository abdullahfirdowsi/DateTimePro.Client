// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { TimeZoneService } from '../time-zone.service';

// @Component({
//   selector: 'app-time-zone',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './time-zone.component.html',
//   styleUrls: ['./time-zone.component.css']
// })
// export class TimeZoneComponent implements OnInit {
//   localTime: any;
//   timezones: any[] = [];
//   selectedTimezone: string = '';
//   selectedTimeZoneInfo: any;
//   formattedDateTime: string = '';

//   constructor(private timeZoneService: TimeZoneService) { }

//   ngOnInit(): void {
//     this.timeZoneService.getLocalTime().subscribe(data => {
//       this.localTime = data;
//       this.formattedDateTime = data.currentTime;
//     });

//     this.timeZoneService.getAllTimeZones().subscribe(data => {
//       this.timezones = data;
//     });
//   }

//   onTimezoneChange(): void {
//     this.timeZoneService.getTimeZoneById(this.selectedTimezone).subscribe(data => {
//       this.selectedTimeZoneInfo = data;
//       this.formattedDateTime = data.currentTime;
//     });
//   }

//   isLocalTimezone(): boolean {
//     return this.selectedTimezone === this.localTime.id;
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeZoneService } from '../time-zone.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-time-zone',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './time-zone.component.html',
  styleUrls: ['./time-zone.component.css']
})
export class TimeZoneComponent implements OnInit, OnDestroy {
  localTime: any;
  timezones: any[] = [];
  selectedTimezone: string = '';
  selectedTimeZoneInfo: any;
  formattedDateTime: string = '';
  private localTimeSubscription: Subscription | undefined;
  private timeSubscription: Subscription | undefined;

  constructor(private timeZoneService: TimeZoneService) { }

  ngOnInit(): void {
    this.startLocalTimeUpdates();

    this.timeZoneService.getAllTimeZones().subscribe(data => {
      this.timezones = data;
    });
  }

  onTimezoneChange(): void {
    if (this.selectedTimezone) {
      this.startTimeUpdates(this.selectedTimezone);
    } else {
      // Handle case when blank option is selected
      if (this.timeSubscription) {
        this.timeSubscription.unsubscribe();
        this.timeSubscription = undefined;
      }
      // Clear the formatted date time when no timezone is selected
      this.formattedDateTime = '';
    }
  }

  private startLocalTimeUpdates(): void {
    if (this.localTimeSubscription) {
      this.localTimeSubscription.unsubscribe();
    }
    this.localTimeSubscription = this.timeZoneService.getCurrentTimePeriodically('local').subscribe(data => {
      this.localTime = data;
      // Don't set formattedDateTime when no timezone is selected
    });
  }

  private startTimeUpdates(timeZoneId: string): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
    this.timeSubscription = this.timeZoneService.getCurrentTimePeriodically(timeZoneId).subscribe(data => {
      this.selectedTimeZoneInfo = data;
      this.formattedDateTime = data.currentTime;
    });
  }

  isLocalTimezone(): boolean {
    return this.selectedTimezone === this.localTime?.id;
  }

  ngOnDestroy(): void {
    if (this.localTimeSubscription) {
      this.localTimeSubscription.unsubscribe();
    }
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
}