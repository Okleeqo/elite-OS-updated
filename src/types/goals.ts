export interface Strategy {
  id: string;
  name: string;
  description: string;
}

export interface Action {
  id: string;
  name: string;
  strategies: Strategy[];
}

export interface Goal {
  id: string;
  name: string;
  gradient: string;
  actions: Action[];
}

export interface Gap {
  id: string;
  name: string;
  gradient: string;
  goals: Goal[];
}