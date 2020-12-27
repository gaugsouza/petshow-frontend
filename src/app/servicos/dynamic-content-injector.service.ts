import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { CadastroAdicionalComponent } from 'src/app/perfis/cadastro-adicional/cadastro-adicional.component';
import { Adicional } from '../interfaces/adicional';

@Injectable({
  providedIn: 'root'
})
export class DynamicContentInjectorService {
  private rootViewComponent:ViewContainerRef;
  constructor(private resolver:ComponentFactoryResolver) { }

  setViewContainerRef(ref:ViewContainerRef) {
    this.rootViewComponent = ref;
  }

  addDynamicComponent(adicional:Adicional):Adicional {
    const factory = this.resolver.resolveComponentFactory(CadastroAdicionalComponent);
    const component = factory.create(this.rootViewComponent.injector);
    component.instance.adicional = adicional;
    this.rootViewComponent.insert(component.hostView);
    return adicional;
  }
}
