export interface Action {
  type: string;
  payload: any;
}

export interface DynObject {
  [k: string]: any;
}

export interface Saying {
  id: string;
  set: string;
  owner: string;
  saying: string;
  createdAt: string;
  hasRecording: boolean;
}

export interface Set {
  id: string;
  name: string;
  owner: string;
  shared: string[];
}

export type CurrentSet = {
  set: Set;
  sayings: Saying[];
};

export type Sets = Set[];
