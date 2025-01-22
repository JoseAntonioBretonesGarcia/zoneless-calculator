import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { ToastrService } from 'ngx-toastr';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'warning',
    ]);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: ToastrService, useValue: toastrService },
      ],
    });
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set properties to default values when constructNumber is called with C', () => {
    // Arrange: Set initial values
    service.resultText.set('2');
    service.subResultText.set('3');
    service.lastOperator.set('*');
    // Act: Call constructNumber with C
    service.constructNumber('C');
    // Assert: Check if the properties are set to default values
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText when constructNumber is called with a number', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');
    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('3');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('1');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('4');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('8');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('5');
  });

  it('should calculate result correctly for percentage', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('0');
    service.constructNumber('0');
    service.constructNumber('%');
    expect(service.resultText()).toBe('10');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');
    expect(service.resultText()).toBe('1.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.5');
  });

  it('should handle decimal point correctly when first character is 0', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('5');
    expect(service.resultText()).toBe('0.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('0.5');
  });

  it('should validate invalid input', () => {
    const result = service['isValidInput']('p');
    expect(result).toBeFalse();
    expect(toastrService.error).toHaveBeenCalledWith('Invalid input: p');
  });

  it('should handle backspace correctly', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('0');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('10');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle change operator symbol correctly "+/-"', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should handle max characters control works correctly', () => {
    service.resultText.set('0123456789');
    service.constructNumber('1');
    expect(toastrService.warning).toHaveBeenCalledWith(
      'Max characters reached'
    );
    expect(service.resultText()).toBe('0123456789');
  });
});
