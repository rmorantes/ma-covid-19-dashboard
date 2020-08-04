import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-content-selection-button',
  styleUrls: ['./content-selection-button.component.scss'],
  templateUrl: './content-selection-button.component.html',
})
class ContentSelectionButtonComponent {
  @Input() label;
  @Input() isSelected;

  @Output() clicked = new EventEmitter();

  updateSelection() {
    this.clicked.emit(this.label);
  }
}

export default ContentSelectionButtonComponent;
