import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js';
import { flatten } from 'lodash';

@Component({
	selector: 'lib-datepicker-dialog',
	templateUrl: './datepicker-dialog.component.html',
	styleUrls: ['./datepicker-dialog.component.scss']
})
export class DatepickerDialogComponent implements OnInit {
	@Input() top: number = 0;
	@Input() left: number = 0;
	@Output() onSelect = new EventEmitter<string>();
	@Input() selectedDate: any;
	displayedYearAndMonth = '';
	currentDate: any;
	rows: any[][] = [];
	months: any[] = [
		[
			{
				text: 'فروردین',
				disabled: false
			},
			{
				text: 'اردیبهشت',
				disabled: false
			},
			{
				text: 'خرداد',
				disabled: false
			}
		],
		[
			{
				text: 'تیر',
				disabled: false
			},
			{
				text: 'مرداد',
				disabled: false
			},
			{
				text: 'شهریور',
				disabled: false
			}
		],
		[
			{
				text: 'مهر',
				disabled: false
			},
			{
				text: 'آبان',
				disabled: false
			},
			{
				text: 'آذر',
				disabled: false
			}
		],
		[
			{
				text: 'دی',
				disabled: false
			},
			{
				text: 'بهمن',
				disabled: false
			},
			{
				text: 'اسفند',
				disabled: false
			}
		]
	];

	constructor() {
	}

	ngOnInit(): void {
		if (this.selectedDate === undefined || this.selectedDate === null) {
			this.currentDate = this.getTodayCalendarInPersian(true);
			this.selectedDate = this.getTodayCalendarInPersian();
		} else {
			this.currentDate = {
				year: this.selectedDate.year,
				month: this.selectedDate.month,
				day: this.selectedDate.day,
				hour: this.selectedDate.hour,
				minute: this.selectedDate.minute
			};
		}
		this.updateDisplayedDate();
	}

	getTodayCalendarInPersian(selectDay = false) {
		const today = new Date();
		const persianDate = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());

		return {
			year: persianDate.jy,
			month: persianDate.jm,
			day: selectDay ? persianDate.jd : 0,
			hour: (today.getHours().toString().length === 1) ? '0' + today.getHours() : today.getHours().toString(),
			minute: (today.getMinutes().toString().length === 1) ? '0' + today.getMinutes() : today.getMinutes().toString()
		};
	}

	updateDisplayedDate() {
		this.displayedYearAndMonth = `${flatten(this.months)[this.currentDate.month - 1].text} ${this.currentDate.year}`;
		const gregorianDate = toGregorian(this.currentDate.year, this.currentDate.month, 1);
		let startDayOfMonth = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd).getDay();
		startDayOfMonth = startDayOfMonth === 6 ? 0 : startDayOfMonth + 1;
		const monthLength = jalaaliMonthLength(this.currentDate.year, this.currentDate.month);
		const dayRows = Math.floor((monthLength - (7 - startDayOfMonth)) / 7);
		this.rows = [];
		const firstRow = [];
		for (let m = 0; m < startDayOfMonth; m++) {
			firstRow.push(0);
		}
		for (let i = 1; i <= (7 - startDayOfMonth); i++) {
			firstRow.push(i);
		}
		this.rows.push(firstRow);
		for (let j = (7 - startDayOfMonth) + 1; j < (dayRows * 7) + (7 - startDayOfMonth) + 1; j += 7) {
			const row = [];
			for (let z = j; z < j + 7; z++) {
				row.push(z);
			}
			this.rows.push(row);
		}
		if (monthLength - flatten(this.rows).slice(-1)[0] !== 0) {
			const lastRow = [];
			for (let n = flatten(this.rows).slice(-1)[0] + 1; n <= monthLength; n++) {
				lastRow.push(n);
			}
			for (let v = 0; v < 7 - (monthLength - (flatten(this.rows).slice(-1)[0])); v++) {
				lastRow.push(0);
			}
			this.rows.push(lastRow);
		}
	}

	goToNextYear() {
		this.currentDate.year++;
		this.updateDisplayedDate();
	}

	goToNextMonth() {
		if (this.currentDate.month === 12) {
			this.currentDate.month = 1;
			this.currentDate.year++;
		} else {
			this.currentDate.month++;
		}
		this.updateDisplayedDate();
	}

	goToPrevMonth() {
		if (this.currentDate.month === 1) {
			this.currentDate.month = 12;
			this.currentDate.year--;
		} else {
			this.currentDate.month--;
		}
		this.updateDisplayedDate();
	}

	goToPrevYear() {
		this.currentDate.year--;
		this.updateDisplayedDate();
	}

	selectDate(year: number, month: number, day: number) {
		this.selectedDate.day = day;
		this.selectedDate.month = month;
		this.selectedDate.year = year;
		this.onSelect.emit(`${this.selectedDate.year}/${this.selectedDate.month}/${this.selectedDate.day}`);
	}

	selectToday() {
		this.currentDate = this.getTodayCalendarInPersian(true);
		this.selectedDate = this.getTodayCalendarInPersian(true);
		this.updateDisplayedDate();
		this.onSelect.emit(`${this.selectedDate.year}/${this.selectedDate.month}/${this.selectedDate.day}`);
	}

}
