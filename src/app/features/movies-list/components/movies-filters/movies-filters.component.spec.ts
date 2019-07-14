import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MoviesFiltersComponent } from './movies-filters.component';


const MOCK_CHANGES = {
  filterValues: {
    currentValue: {
      genre: 'adventure',
      order: 'name:asc'
    }
  }
};

describe('MoviesFiltersComponent', () => {
  let component: MoviesFiltersComponent;
  let fixture: ComponentFixture<MoviesFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ MoviesFiltersComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesFiltersComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line
    component['initForm']();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges() should not call initForm() if form is already initialized', () => {
    const initFormSpy = spyOn<any>(component, 'initForm');
    component.ngOnChanges({});
    expect(initFormSpy).not.toHaveBeenCalled();
  });

  it('ngOnChanges() should not call updateForm()', () => {
    const updateFormSpy = spyOn<any>(component, 'updateForm');
    component.ngOnChanges(MOCK_CHANGES as any);
    expect(updateFormSpy).toHaveBeenCalledWith({ genre: 'adventure', order: 'name:asc' });
  });
});
