import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { CalculatorService } from '@app/calculator/services/calculator.service';
import { CalculatorComponent } from './calculator.component';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine
    .createSpy('subResultText')
    .and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('Calculator', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('it should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('it should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('101.00');
    mockCalculatorService.subResultText.and.returnValue('01');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(component.resultText()).toBe('101.00');
    expect(component.subResultText()).toBe('01');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button components with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventEscape);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();
    expect(compiled.querySelector('#sub-result')?.textContent?.trim()).toBe(
      '10 -'
    );
  });

  it('should construc number correctly when handle click function is called', () => {
    component.handleClick('1');
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('1');
  });
});
