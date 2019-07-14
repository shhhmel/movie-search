import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MovieDetailsPageComponent } from './movie-details-page.component';
import { MoviesFacade } from 'src/app/store';
import { MoviesFacadeMock } from 'src/app/store/movies/movies.facade.mock';


describe('MovieDetailsPageComponent', () => {
  let component: MovieDetailsPageComponent;
  let fixture: ComponentFixture<MovieDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsPageComponent ],
      providers: [
        { provide: MoviesFacade, useClass: MoviesFacadeMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
