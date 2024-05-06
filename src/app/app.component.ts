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

  displayTimetableForNextWeek : boolean;

  mondayTimetable : string[];
  saturdayTimetable : string[];

  today : Date = new Date();

  ngOnInit() {
    let educationStartDate : Date = new Date(2024, 1, 12, -1);

    // If weeks count since education start is even, schedule is set by numerator
    if (this.getWeeksSinceDate(educationStartDate) % 2 == 0) this.isNumerator = true;
    // If no, then education is set by denumerator
    else this.isNumerator = false;

    // If today's day is Sunday, show timetable for the next week
    if (this.today.getDay() == 0) this.displayTimetableForNextWeek = true;

    // If there is need to show timetable for the next week
    if (this.displayTimetableForNextWeek) this.isNumerator = !this.isNumerator;

    // Set default values for the schedule
    this.setGroup("KNMS-22");
    this.setSubgroup(1);
  }

  // Gets the next date of certain day
  // Usage example: Get the next date of Monday
  getNextDateOfDay(targetDay: number): Date {
    const currentDate = new Date(this.today);
    const currentDay = currentDate.getDay();
    const difference = targetDay - currentDay;
    const targetDate = new Date(currentDate.getTime() + difference * 24 * 60 * 60 * 1000);
    return targetDate;
  }

  // Gets weeks since certain date
  getWeeksSinceDate(customDate: Date): number {
    const currentDate = new Date(this.today);
    
    // Number of milliseconds in a week
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;

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

  // Updates variables with schedule data
  // These variables are being displayed in UI
  updateData() {
    if (this.isNumerator) 
    {
      this.mondayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Monday.Numerator;
      this.saturdayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Saturday.Numerator;
    }
    else
    {
      this.mondayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Monday.Denumerator;
      this.saturdayTimetable = data[this.currentGroup][`Subgroup-${this.currentSubgroup}`].Saturday.Denumerator;
    }
  }
}
