import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MoviesListPageComponent } from './movies-list-page.component';
import { MoviesFacade } from 'src/app/store';
import { MoviesFacadeMock } from 'src/app/store/movies/movies.facade.mock';


describe('MoviesListPageComponent', () => {
  let component: MoviesListPageComponent;
  let fixture: ComponentFixture<MoviesListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: MoviesFacade, useClass: MoviesFacadeMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
