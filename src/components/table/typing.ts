export type Column<Id extends string> = {
  Header: string;
  accessor: Id;
};

export type Data<Id extends string> = Record<Id, string | number>;
