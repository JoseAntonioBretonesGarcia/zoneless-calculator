import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private operators = ['+', '-', '*', '/'];
  private specialOperators = ['%', '+/-', '.', '=', 'C', 'Backspace', 'Shift'];
  private toastr = inject(ToastrService);

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  private calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
      case '%':
        result = number2 / 100;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }

  private isValidInput(value: string): boolean {
    if (
      ![...this.numbers, ...this.operators, ...this.specialOperators].includes(
        value
      )
    ) {
      this.toastr.error(`Invalid input: ${value}`);
      return false;
    }
    return true;
  }

  private backspace() {
    if (this.resultText() === '0') return;
    if (this.resultText().length === 1) {
      this.resultText.set('0');
      return;
    }
    this.resultText.update((previousValue) => previousValue.slice(0, -1));
  }

  private operatorAplication(value: string) {
    this.calculateResult();
    this.lastOperator.set(value);
    this.subResultText.set(this.resultText());
    this.resultText.set('0');
  }

  private cleanResult() {
    this.resultText.set('0');
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }

  private validateDecimalPoint() {
    if (this.resultText() === '0' || this.resultText() === '') {
      this.resultText.update((previousValue) => previousValue + '.');
      return;
    }
    this.resultText.update((previousValue) => previousValue + '.');
  }

  // +/-
  private changeOperatorSymbol(value: string) {
    if (this.resultText().includes('-')) {
      this.resultText.update((previousValue) => previousValue.slice(1));
      return;
    }
    this.resultText.update((previousValue) => '-' + previousValue);
  }

  private addNumber(value: string) {
    if (this.resultText() === '0') {
      this.resultText.set(value);
      return;
    }
    if (this.resultText() === '-0') {
      this.resultText.set('-' + value);
      return;
    }
    this.resultText.update((previousValue) => previousValue + value);
  }

  public constructNumber(value: string): void {
    // Valid if the input exists in the characters arrays
    if (!this.isValidInput(value)) return;
    //  =
    if (value === '=' || value === '%') {
      if (value === '%') this.lastOperator.set(value);
      this.calculateResult();
      return;
    }

    // Clean results
    if (value === 'C') {
      this.cleanResult();
      return;
    }

    // Backspace
    if (value === 'Backspace') {
      this.backspace();
      return;
    }

    // Aplication of the operator
    if (this.operators.includes(value)) {
      this.operatorAplication(value);
      return;
    }

    // Control max characters
    if (this.resultText().length >= 10) {
      this.toastr.warning('Max characters reached');
      return;
    }

    // Validate decimal point
    if (value === '.' && !this.resultText().includes('.')) {
      this.validateDecimalPoint();
      return;
    }

    // Handle zero initial value
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    // Change operator symbol
    if (value === '+/-') {
      this.changeOperatorSymbol(value);
      return;
    }

    // Add any number
    if (this.numbers.includes(value)) {
      this.addNumber(value);
    }
  }
}
