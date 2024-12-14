import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from '@app/calculator/components/calculator/calculator.component';

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'min-w-[300px] sm:min-w-[350px]' },
})
export default class CalculatorViewComponent {}
