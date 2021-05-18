export interface Action {
  type: string;
  payload: any;
}

export interface DynObject {
  [k: string]: any;
}

export interface Set {
  id: string;
  name: string;
  owner: string;
  shared: string[];
}

export type Sets = Set[];
