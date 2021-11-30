import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { ServicoDeHistorico } from 'src/domain/services/servico-de-historico';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cities: City[];
  historico: City[] = [];
  hasError: boolean = false;
  mostrarHistorico: boolean = true;
  errorMessage: string;

  constructor(
    private readonly searchService: SearchCityService,
    private readonly router: Router,
    private readonly servicoDeHistorico: ServicoDeHistorico
  ) {}

  // Ao iniciar o aplicativo, atualiza o histórico com as cidades armazenadas no Ionic Storage.
  async ionViewDidEnter(){
    this.historico = await this.servicoDeHistorico.buscarHistorico();
  }

  async onSearch(query: string) {
    try {
      this.hasError = false;
      this.cities = await this.searchService.search(query);
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }  

  async onSelectCity(cityId: string) {
    this.router.navigateByUrl(`/weather/${cityId}`);
    await this.servicoDeHistorico.adicionarAoHistorico(cityId);
    this.historico = await this.servicoDeHistorico.buscarHistorico();
  }

}
