import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      title: [data.task.title, Validators.required],
      description: [data.task.description],
      stageId: [data.task.stageId, Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;

    const updatedTask = {
      ...this.data.task,
      ...this.form.value,
      stageId: Number(this.form.value.stageId)
    };

    this.http.patch(`http://localhost:3000/tasks/${this.data.task.id}`, updatedTask)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
