import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from "rxjs";
import { tap } from 'rxjs/operators';
import { DatepickerDialogComponent } from './datepicker-dialog/datepicker-dialog.component';
import { NgxPersianDateSelectorService } from './ngx-persian-date-selector.service';

@Component({
	selector: 'ngx-persian-date-selector',
	templateUrl: './ngx-persian-date-selector.component.html',
	styles: [
	]
})
export class NgxPersianDateSelectorComponent implements OnInit, AfterViewInit {
	@Input() matInput: any;
	@Output() onSelect = new EventEmitter<string>();
	componentRef: any;
	documentClickSubscription!: Subscription;

	constructor(private ngxPersianDateSelectorService: NgxPersianDateSelectorService, private cd: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		setTimeout(() => {
			// this.matInput.readOnly = true;
		}, 0);
	}

	ngAfterViewInit(): void {
	}

	openCalendar(event: any) {
		event.stopPropagation();
		const rect = this.getOffset(event.target as HTMLElement);
		this.componentRef = this.ngxPersianDateSelectorService.createComponent(DatepickerDialogComponent, {
			top: rect.top,
			left: rect.left,
			selectedDate: this.matInput.value !== '' ? {
				year: parseInt(this.matInput.value.split('/')[0], 10),
				month: parseInt(this.matInput.value.split('/')[1], 10),
				day: parseInt(this.matInput.value.split('/')[2], 10),
				hour: 0,
				minute: 0
			} : null
		});
		this.componentRef.instance.onSelect.pipe(
			tap((evt: any) => {
				this.onSelect.emit(evt);
				this.matInput.value = evt;
				(this.matInput as HTMLInputElement).dispatchEvent(new Event('change'));
				this.cd.detectChanges();
				this.closeCalendar();
			})
		).subscribe();
		this.ngxPersianDateSelectorService.attachComponent(this.componentRef, document.body);

		this.documentClickSubscription = fromEvent(document, 'click')
			.pipe(
				tap((evt: any) => {
					if (this.componentRef !== undefined) {
						this.closeCalendar();
					}
				})
			)
			.subscribe();
		fromEvent(document.querySelector('.ngx-persian-datepicker-dialog-container') as Element, 'click')
			.pipe(
				tap((evt: any) => {
					evt.stopPropagation();
				})
			)
			.subscribe();
	}

	closeCalendar() {
		this.ngxPersianDateSelectorService.detachComponent(this.componentRef);
		this.documentClickSubscription.unsubscribe();
	}

	getOffset(el: HTMLElement) {
		var rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

}
