# ngx-persian-date-selector

Angular 12+ persian date selector


## Usage

1. Install from npm:
```
npm install ngx-persian-date-selector --save
```

2. Import **NgxPersianDateSelectorModule** to app.module.ts:
```javascript
import { NgxPersianDateSelectorModule } from 'ngx-persian-date-selector';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NgxPersianDateSelectorModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Now use this in your component:
```html
<mat-form-field>
	<input type="text" #date matInput placeholder="Date">
	<ngx-persian-date-selector matSuffix [matInput]="date"></ngx-persian-date-selector>
</mat-form-field>
```

## Events
| Event | Description | Sample |
| ----- | ----------- | ------ |
| onSelect() | triggers when date is selected | (onSelect)="dateSelected($event)" |
