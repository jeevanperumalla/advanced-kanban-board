import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from 'src/app/core/services/task.service';
import { StageService } from 'src/app/core/services/stage.service';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'stage', 'actions'];
  dataSource = new MatTableDataSource<Task>();

  stages: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private stageService: StageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.stageService.getStages().subscribe(stages => {
      stages.forEach((s: any) => this.stages[s.id] = s.name);

      this.taskService.getTasks().subscribe(tasks => {
        this.dataSource.data = tasks;

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStageName(stageId: any) {
    return this.stages[stageId];
  }

  delete(id: any) {
    if (confirm("Are you sure to delete this task?")) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
