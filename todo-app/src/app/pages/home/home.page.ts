import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefaCollection : any[]=[];
  
  constructor(
    private alertCtrl : AlertController, 
    private tarefaService: TarefaService,
    private actionSheetCtrl : ActionSheetController) {}
  
  ionViewDidEnter(){
    this.listarTarefa()
  }

  deleteTarefa(item:any){
    this.tarefaService.delete(item, ()=>{
      this.listarTarefa()
    })
    
  }

  listarTarefa(){
    this.tarefaCollection = this.tarefaService.listar()
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'Informe a tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Digite sua tarefa'
        },
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },{
          text: 'Salvar',
          handler: (tarefa) =>{
            this.tarefaService.salvar(tarefa), this.listarTarefa();
          }
        }
      ]
    });
  
  await alert.present()
  }
  async openActions(tarefa: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: tarefa.feito ? 'Colocar como pendente': 'Marcar como feito',
          icon: tarefa.feito ? 'close-outline' : 'checkmark-circle',
          handler: ()=>{
            tarefa.feito = !tarefa.feito;
            this.tarefaService.atualizar(tarefa, ()=>{
              this.listarTarefa()
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

}
