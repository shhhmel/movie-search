import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { SearchFacade } from 'src/app/store';
import { SearchFacadeMock } from 'src/app/store/search/search.facade.mock';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: SearchFacade, useClass: SearchFacadeMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onQueryChange() should call searchFacade.search(query) or searchFacade.clearSearch()', () => {
    // tslint:disable-next-line
    const searchSpy = spyOn<any>(component['searchFacade'], 'search').and.callThrough();
    // tslint:disable-next-line
    const clearSearchSpy = spyOn<any>(component['searchFacade'], 'clearSearch').and.callThrough();

    component.onQueryChange('a');

    expect(searchSpy).toHaveBeenCalledWith('a');

    component.onQueryChange('');

    expect(clearSearchSpy).toHaveBeenCalled();
  });
});
