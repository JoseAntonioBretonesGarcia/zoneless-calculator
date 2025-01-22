import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';
import { ToastrService } from 'ngx-toastr';
import { CalculatorService } from '@app/calculator/services/calculator.service';

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
      providers: [CalculatorService, { provide: ToastrService, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it(`should contain basic css classes on main div element`, () => {
    const div = compiled.querySelector('div');
    const mustHaveCssClasses =
      'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' '
      );

    expect(div).toBeTruthy();

    mustHaveCssClasses.forEach((cssClass) => {
      expect(div?.classList.contains(cssClass)).toBeTruthy();
    });
  });
});
