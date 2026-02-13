import { Component } from '@angular/core';
import { SchedulePerDay } from './models/schedulePerDay';
const data = require('../data.json') as SchedulePerDay[];

declare var require: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentGroup : string;
  isNumerator : boolean;
  schedules: SchedulePerDay[] = data;
  today : Date = new Date();

  ngOnInit() {
    let educationStartDate : Date = new Date(2026, 1, 16);

    // Calculate the number of weeks since education start date
    const weeksSinceStart = this.getWeeksSinceDate(educationStartDate);

    // If weeks count since education start is even, schedule is set by numerator
    // If odd, then education is set by denumerator
    this.isNumerator = weeksSinceStart % 2 !== 0;

    // Set default values for the schedule
    this.setGroup("КНМС-41 II");
  }

  isNumeratorForDay(dayIndex: number): boolean {
    if (dayIndex > 7) {
      return !this.isNumerator;
    }
    return this.isNumerator;
  }

  // Gets the next date of certain day
  // Usage example: Get the next date of Monday
  getNextDateOfDay(targetDay: number): Date {
    const currentDate = new Date(this.today);
    const currentDay = this.getTodayDayIndex();
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
  }

  getAllSchedules(): SchedulePerDay[] {
    return [...this.getSchedulesForCurrentWeek(), ...this.getSchedulesForNextWeek()].sort((a, b) => a.DayIndex - b.DayIndex);
  }

  getSchedulesForCurrentWeek(): SchedulePerDay[] {
    return data.filter(x => x.Group == this.currentGroup && x.DayIndex >= this.getTodayDayIndex());
  }

  getSchedulesForNextWeek(): SchedulePerDay[] {
    let schedulesForCurrentWeek = this.getSchedulesForCurrentWeek();
    if (schedulesForCurrentWeek.length < data.filter(x => x.Group == this.currentGroup).length) {
      let dataToReturn = [...data.filter(x => x.Group == this.currentGroup && x.DayIndex < this.getTodayDayIndex())];
      dataToReturn.forEach(x => x.DayIndex += 7);
      return dataToReturn;
    }

    return [];
  }

  getGroupsList(): string[] {
    return [...new Set(data.map(x => x.Group))];
  }

  // Method to get the today's day index (in order to make Monday as 1st day and Sunday as 7th)
  getTodayDayIndex(): number {
    let dayIndex = this.today.getDay();
    if (dayIndex == 0) return 7;
    return dayIndex;
  }
}