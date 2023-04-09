import { Component } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selected: Date | undefined;

  setStreakDateClass() {
    // return (date: Date): MatCalendarCellCssClasses => {
    //
    // }
  }
}
