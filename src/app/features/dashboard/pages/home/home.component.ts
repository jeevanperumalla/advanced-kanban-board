import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  total = 0;
  completed = 0;
  pending = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.total = tasks.length;
      this.completed = tasks.filter(t => Number(t.stageId) === 4).length;
      this.pending = this.total - this.completed;
    });
  }
}
