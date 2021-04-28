import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly startAt: number;
  readonly endAt: number;
  readonly items?: (Item | null)[];
  constructor(init: ModelInit<Project>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

export declare class Item {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly project?: Project;
  constructor(init: ModelInit<Item>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}