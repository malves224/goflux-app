import { Request, Response } from 'express';
import { Service } from '../interfaces/Service';

class GenericController<T, TM> {
  constructor(
    public route: string,
    public service: Service<T, TM>,
    public msgNotFound = 'Objeto não encontrado',
  ) {}

  async findAll(_req: Request, res: Response<TM[]>) {
    const list = await this.service.findAll();
    return res.status(200).json(list);
  }

  async findOne(req: Request, res: Response) {
    const obj = await this.service.findOne(req.params.id);

    if (!obj) {
      return res.status(404)
        .json({ message: this.msgNotFound }); 
    }

    return res.status(200).json(obj);
  }

  async create(req: Request, res: Response) {
    try {
      const obj = await this.service.create(req.body);
      return res.status(201).json(obj);
    } catch (error) {
      const { message } = error as Error;
      return res.status(401).json({ message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      await this.service.update(req.params.id, req.body);
      return res.status(200).json({ message: 'Atualizado com sucesso.' });
    } catch (error) {
      const { message } = error as Error;
      return res.status(401).json({ message });
    }
  }

  async delete(req: Request, res: Response): Promise<void | typeof res> {
    try {
      await this.service.delete(req.params.id);
      return res.status(200).json({ message: 'Deletado com sucesso.' });
    } catch (error) {
      const { message } = error as Error;
      console.log(message);
      return res.status(401).json({ message });
    }
  }
}

export default GenericController;
