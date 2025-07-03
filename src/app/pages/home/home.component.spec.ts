import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    expect(heading?.textContent).toContain('Welcome to ai-hw-2!');
  });

  it('should render navigation instruction', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph?.textContent).toContain('This is the home page. Navigate to the Users tab to manage user data.');
  });

  it('should have correct container structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.home-container');
    expect(container).toBeTruthy();
  });

  it('should render complete home page content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Welcome to ai-hw-2!');
    expect(compiled.textContent).toContain('This is the home page. Navigate to the Users tab to manage user data.');
  });
});
