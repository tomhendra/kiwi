import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly tasks?: (Task | null)[];
  readonly createdAt?: string;
  constructor(init: ModelInit<Project>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

export declare class Task {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly project?: Project;
  readonly createdAt?: string;
  constructor(init: ModelInit<Task>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}