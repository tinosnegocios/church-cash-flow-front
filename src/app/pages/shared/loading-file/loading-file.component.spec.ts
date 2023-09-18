import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFileComponent } from './loading-file.component';

describe('LoadingFileComponent', () => {
  let component: LoadingFileComponent;
  let fixture: ComponentFixture<LoadingFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingFileComponent]
    });
    fixture = TestBed.createComponent(LoadingFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
