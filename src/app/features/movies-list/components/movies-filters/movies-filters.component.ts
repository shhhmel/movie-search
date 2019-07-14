import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { IFilterValues } from 'src/app/models/filter-values';
import { IFilterOptions } from 'src/app/models/filter-options';


@Component({
  selector: 'app-movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesFiltersComponent implements OnChanges {
  @Input() filterValues: IFilterValues;
  @Input() filterOptions: IFilterOptions;
  @Output() filterChange: EventEmitter<IFilterValues> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form) { this.initForm(); }
    const { filterValues } = changes;
    const genre = filterValues && filterValues.currentValue && filterValues.currentValue.genre;
    const order = filterValues && filterValues.currentValue && filterValues.currentValue.order;
    this.updateForm({ genre, order });
  }

  private updateForm({ genre, order }: IFilterValues): void {
    if (this.form.get('genre').value !== genre) {
      this.form.get('genre').setValue(genre);
    }
    if (this.form.get('order').value !== order) {
      this.form.get('order').setValue(order);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      genre: null,
      order: null
    });

    this.form.valueChanges
      .pipe(
        debounceTime(0),
        distinctUntilChanged()
      )
      .subscribe((filters => this.filterChange.emit(filters)));
  }
}
