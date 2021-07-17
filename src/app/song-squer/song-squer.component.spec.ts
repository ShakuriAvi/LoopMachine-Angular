import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSquerComponent } from './song-squer.component';

describe('SongSquerComponent', () => {
  let component: SongSquerComponent;
  let fixture: ComponentFixture<SongSquerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongSquerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSquerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
