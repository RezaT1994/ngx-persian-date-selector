import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPersianDateSelectorComponent } from './ngx-persian-date-selector.component';
import { DatepickerDialogComponent } from './datepicker-dialog/datepicker-dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		NgxPersianDateSelectorComponent,
		DatepickerDialogComponent,
	],
	imports: [
		CommonModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
	],
	exports: [
		NgxPersianDateSelectorComponent
	]
})
export class NgxPersianDateSelectorModule { }
