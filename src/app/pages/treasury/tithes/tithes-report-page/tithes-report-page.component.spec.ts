import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TithesReportPageComponent } from './tithes-report-page.component';

describe('TithesReportPageComponent', () => {
  let component: TithesReportPageComponent;
  let fixture: ComponentFixture<TithesReportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TithesReportPageComponent]
    });
    fixture = TestBed.createComponent(TithesReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
