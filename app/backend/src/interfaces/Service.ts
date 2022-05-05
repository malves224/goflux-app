export interface Service<T, TM> {
  [x: string]: any
  checkIfExist(
    columnWithValue: [string, string | number],
    options: { erroIfExist: boolean },
  ): Promise<Error | void>

  create(obj: T): Promise<TM>

  findAll(): Promise<TM[]>

  findOne(id: string | number): Promise<TM | null>

  update(id: string | number, obj: T): Promise<[number, TM[]]>

  delete(id: string | number): Promise<void>

  findAllActive(): Promise<unknown[] | TM[] | undefined>

}
