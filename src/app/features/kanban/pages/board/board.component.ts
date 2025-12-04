import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { StageService } from 'src/app/core/services/stage.service';
import { Task } from 'src/app/shared/models/task.model';
import { Stage } from 'src/app/shared/models/stage.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from '../../components/edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  stages: Stage[] = [];
  tasks: Task[] = [];
  stageWiseTasks: any = {};
  connectedLists: string[] = [];

  constructor(
    private stageService: StageService,
    private taskService: TaskService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stageService.getStages().subscribe(stages => {
      this.stages = stages;
     this.connectedLists = this.stages.map(s => "list-" + s.id);
      this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks;
        this.prepareBoard();
      });
    });
  }

  prepareBoard() {
  this.stageWiseTasks = {};

  this.stages.forEach(stage => {
    const stageKey = String(stage.id); 
    this.stageWiseTasks[stageKey] = this.tasks.filter(t =>
      String(t.stageId) === stageKey     
    );
  });
}


  drop(event: CdkDragDrop<Task[]>, stageId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const movedTask = event.container.data[event.currentIndex];
      movedTask.stageId = stageId;
      this.http.patch(`http://localhost:3000/tasks/${movedTask.id}`, movedTask).subscribe();
    }
  }
   openAddTaskDialog() {
  const dialogRef = this.dialog.open(AddTaskDialogComponent, {
    width: '400px',
    data: { stages: this.stages }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadData(); 
    }
  });
}
openEditTaskDialog(task: Task) {
  const dialogRef = this.dialog.open(EditTaskDialogComponent, {
    width: '400px',
    data: { task, stages: this.stages }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadData(); 
    }
  });
}
deleteTask(id: string, event: Event) {
  event.stopPropagation();

  if (confirm("Are you sure you want to delete this task?")) {
    this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe(() => {
      this.loadData();  
    });
  }
}
trackByTask(index: number, task: Task) {
  return task.id;
}
}
