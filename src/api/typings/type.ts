export enum Types {
  lectrure = 'лекция',
  practice = 'практика',
}

export type Type = {
  typeId: string;
  type: Types;
};
