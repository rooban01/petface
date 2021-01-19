import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryLeftComponent } from './story-left.component';

describe('StoryLeftComponent', () => {
  let component: StoryLeftComponent;
  let fixture: ComponentFixture<StoryLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
