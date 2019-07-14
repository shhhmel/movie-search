import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit {
  @Input() movies: any[];
  @Output() queryChange: EventEmitter<string> = new EventEmitter();

  form: FormGroup;
  isFocused = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  clearQuery(): void {
    this.form.get('query').setValue(null);
  }

  private initForm(): void {
    this.form = this.fb.group({
      query: null,
    });

    this.form.get('query').valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(query => this.queryChange.emit(query));
  }

}
