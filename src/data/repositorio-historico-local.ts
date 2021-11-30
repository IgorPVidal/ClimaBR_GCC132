import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { City } from 'src/domain/entities/city';
import { CityRepository } from 'src/domain/services/protocols/city-repository';


@Injectable()
export class RepositorioHistoricoLocal extends CityRepository {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    super()
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async adicionarAoHistorico(cidade: City): Promise<void> {
    this._storage.set(cidade.id.toString(), cidade);
  }

  // Implementação de método abstrato de "CityRepository"
  async getAll(): Promise<City[]> {
    let historico = []
    await this._storage.forEach((cidade) => {
        historico.push(cidade)
    });
    return historico;
  }

  // Implementação de método abstrato de "CityRepository"
  async getById(id: number): Promise<City> {
    return this._storage.get(id.toString());
  }

}
