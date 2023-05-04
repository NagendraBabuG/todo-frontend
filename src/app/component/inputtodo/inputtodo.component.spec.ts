import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputtodoComponent } from './inputtodo.component';

describe('InputtodoComponent', () => {
  let component: InputtodoComponent;
  let fixture: ComponentFixture<InputtodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputtodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
