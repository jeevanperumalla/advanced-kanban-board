import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      stageId: ['', Validators.required]  
    });
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    const newTask = {
      ...this.taskForm.value,
      stageId: Number(this.taskForm.value.stageId)  
    };

    this.http.post('http://localhost:3000/tasks', newTask).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
