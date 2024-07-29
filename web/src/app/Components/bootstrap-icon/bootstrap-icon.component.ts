import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bootstrap-icon',
  standalone: true,
  imports: [],
  templateUrl: './bootstrap-icon.component.html',
  styleUrl: './bootstrap-icon.component.scss'
})
export class BootstrapIconComponent {
  @Input() iconName?: string = 'house-fill'
  @Input() iconTitle?: string = 'Home'
}
