import { ApiEntity } from './ApiEntity';

export class RestApiEntity extends ApiEntity {
  constructor(entityUrl = '') {
    super(entityUrl);
  }

  /**
   * Создаёт новую сущность
   */
  async create<
    R,
  >(data = {} as Record<string, unknown>) {
    return this.http<R>({
      method: 'POST',
      data,
    });
  }

  /**
   * Получает сущность по id
   */
  async getOne<
    R,
  >({ id }: { id: string | number, [key: string]: unknown }) {
    return this.http<R>({ url: `/${id}` });
  }

  /**
   * Получвет все эксемпляры сущности
   */
  async getList<
    R,
  >(data?: unknown) {
    return this.http<R>({ });
  }

  async update<
    R,
  >({ data = {}, id } = {} as { data: Record<string, unknown>, id: string | number }) {
    return this.http<R>(
      {
        method: 'PUT',
        url: id.toString(),
        data,
      },
    );
  }

  /**
   * Удаляет сущность по id
   */
  async delete<
    R = Record<string, unknown>,
  >(id: string | number) {
    return this.http<R>(
      {
        method: 'DELETE',
        url: `${id}`,
      },
    );
  }
}
