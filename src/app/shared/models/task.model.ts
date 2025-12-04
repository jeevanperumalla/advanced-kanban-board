export interface Task {
  id?: string | number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
  stageId: string | number;
  status: string;
}
