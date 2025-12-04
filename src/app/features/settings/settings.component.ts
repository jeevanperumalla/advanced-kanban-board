import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  selectedTheme = 'light';
  rememberMe = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    const savedRemember = localStorage.getItem('rememberMe');

    if (savedTheme) this.selectedTheme = savedTheme;
    if (savedRemember) this.rememberMe = savedRemember === 'true';

    this.applyTheme();
  }

  changeTheme() {
    localStorage.setItem('theme', this.selectedTheme);
    this.applyTheme();
  }

  applyTheme() {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(this.selectedTheme);
  }

  saveSettings() {
    localStorage.setItem('rememberMe', this.rememberMe.toString());
  }
}
