export interface Action {
  type: string;
  payload: any;
}

export interface DynObject {
  [k: string]: any;
}
