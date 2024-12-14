import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@app/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  host: { '(document:keyup)': 'handleKeyboardEvent($event)' },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  private keyEquivalents: Record<string, string> = {
    Escape: 'C',
    Clear: 'C',
    Enter: '=',
    '+': '+',
    '-': '-',
    x: '*',
    X: '*',
    '÷': '/',
  };

  public calculatorButtons = viewChildren(CalculatorButtonComponent);
  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    const keyEquivalentValue = this.keyEquivalents[key] ?? key;
    this.calculatorService.constructNumber(keyEquivalentValue);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    /* Check if the key is a key equivalent else return the key */
    const keyEquivalentValue = this.keyEquivalents[key] ?? key;

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyEquivalentValue);
    });

    this.calculatorService.constructNumber(keyEquivalentValue);
  }
}
