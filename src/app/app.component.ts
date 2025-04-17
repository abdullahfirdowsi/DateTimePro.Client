import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeZoneComponent } from './time-zone/time-zone.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimeZoneComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DateTimePro.Client';
}