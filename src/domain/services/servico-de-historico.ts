import { RepositorioHistoricoLocal } from 'src/data/repositorio-historico-local';
import { City } from 'src/domain/entities/city';
import { CityRepository } from './protocols/city-repository';




export class ServicoDeHistorico{
    constructor (
        private readonly repositorioHistorico: RepositorioHistoricoLocal,
        private readonly repositorioCidade: CityRepository
    ){}

    async adicionarAoHistorico(cityId: String): Promise<void> {
        let cidade = await this.repositorioCidade.getById(Number(cityId));
        this.repositorioHistorico.adicionarAoHistorico(cidade);
    }

    async buscarHistorico(): Promise<City[]> {
        return this.repositorioHistorico.getAll();
    }

}
