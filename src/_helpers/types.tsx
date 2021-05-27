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
  setName: string;
  createdAt: string;
  recording: string;
  hasRecording: boolean;
}

export interface Set {
  id: string;
  name: string;
  owner: string;
  shared: string[];
}

export type Sets = Set[];

export interface Friend {
  name: string;
  email: string;
}
