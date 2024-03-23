import { Component } from '@angular/core';
const data = require('../data.json');

declare var require: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentGroup : string;
  currentSubgroup : number = 1;

  isNumerator : boolean;

  displayTimetablesForNextWeek : boolean;

  mondayTimetable : string[];
  saturdayTimetable : string[];

  today : Date = new Date();

  ngOnInit() {
    let educationStartDate : Date = new Date(2024, 1, 12);
    if (this.getWeeksSinceDate(educationStartDate) % 2 == 0) this.isNumerator = true;
    else this.isNumerator = false;

    if (this.today.getDay() < 1) this.isNumerator = !this.isNumerator;

    this.setGroup("KNMS-22");
    this.setSubgroup(1);
  }

  getNextDateOfDay(targetDay: number): Date {
    const currentDate = new Date(this.today);
    const currentDay = currentDate.getDay();
    const difference = targetDay - currentDay;
    const targetDate = new Date(currentDate.getTime() + difference * 24 * 60 * 60 * 1000);
    return targetDate;
  }

  getWeeksSinceDate(customDate: Date): number {
    const currentDate = new Date(this.today);
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week

    // Calculate the difference in milliseconds between the current date and the custom date
    const timeDifference = currentDate.getTime() - customDate.getTime();

    // Convert the time difference to weeks
    const weeksDifference = Math.floor(timeDifference / millisecondsPerWeek);

    return weeksDifference;
  }

  setGroup(group : string) {
    this.currentGroup = group;
    this.updateData();
  }

  setSubgroup(subgroup : number) {
    this.currentSubgroup = subgroup;
    this.updateData();
  }

  updateData() {
    if (this.isNumerator) {
      this.mondayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Monday.Numerator;
      this.saturdayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Saturday.Numerator;
    } 
    else {
      this.mondayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Monday.Denumerator;
      this.saturdayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Saturday.Denumerator;
    }
  }
}
