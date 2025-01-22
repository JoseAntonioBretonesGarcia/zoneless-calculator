import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it(`should render router-outlet`, () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it(`should render router-outlet wrapped with css classes on div element`, () => {
    const div = compiled.querySelector('div');
    const mustHaveCssClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );

    expect(div).toBeTruthy();

    mustHaveCssClasses.forEach((cssClass) => {
      expect(div?.classList.contains(cssClass)).toBeTruthy();
    });
  });

  it(`should contain anchor element`, () => {
    const anchorElement = compiled.querySelector('a');
    expect(anchorElement).toBeTruthy();
  });

  it(`should contain 'Buy me a beer' title`, () => {
    const anchorElement = compiled.querySelector('a');
    const title = anchorElement?.getAttribute('title');
    expect(title).toBe('Buy me a beer');
  });

  it(`should contain 'Buy me a beer' link`, () => {
    const anchorElement = compiled.querySelector('a');
    const href = anchorElement?.getAttribute('href');
    expect(href).toBe('https://www.buymeacoffee.com/scottwindon');
  });
});
