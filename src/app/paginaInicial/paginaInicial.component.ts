import { Component } from "@angular/core";

interface Receita{
  usuario: string
  nome: string
  ingrediente: string
  passoApasso: string
  comentario: string
  imgUrl: string
  videoUrl: string
  categoria: string
  oculta: boolean
}

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  foto: string;
}

interface Comentario {
  fotoUsuario: string;
  usuarioQueComentou: string;
  comentario: string;
  nota: number;
  receita: string;
  receitaUser: string;
}

interface Pesquisa{
  pesquisa: string
}

@Component({
    templateUrl: 'paginaInicial.component.html',
    styleUrls: ['paginaInicial.component.css']
})

export class PaginaInicialComponent{


  imageUrl: any;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  videoUrl: any;

  onFileSelectedVideo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.videoUrl = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

    Usuario={
      nome: '',
      email: '',
      senha: '',
      foto: ''
    }

    Receita={
      usuario:'',
      nome: '',
      ingrediente: '',
      passoApasso: '',
      comentario: '',
      imgUrl: '',
      videoUrl: '',
      categoria: ''
    }

    Pesquisa={
      pesquisa: ''
    }

  receitas: Receita[] = []
  usuarios: Usuario[] = []
  slide: Receita[] = []
  receitaPagina: Receita[] = []
  userFoto: Usuario[] = []
  comentarios: Comentario[] = []



  ngOnInit(): void {
    const receita = window.localStorage.getItem('receitas') || '[]';
    this.receitas = JSON.parse(receita);

    const user = window.localStorage.getItem('logado') || '[]';
    this.Usuario = JSON.parse(user);

    const user2 = window.localStorage.getItem('registrados') || '[]';
    this.usuarios = JSON.parse(user2);

    var m = this.receitas.length, t, i;

    this.userFoto.push(this.Usuario)

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = this.receitas[m];
      this.receitas[m] = this.receitas[i];
      this.receitas[i] = t;
    }

    localStorage.setItem('receitas', JSON.stringify(this.receitas))

    for (let index = 0; index < 4; index++) {
      this.slide[index] = this.receitas[index];
    }

  }

  salvaImagem(img){
    localStorage.setItem('receitaPagina', JSON.stringify(img))
    window.location.replace("http://localhost:4200/Receita")

  }

  desligaCard(event){
    if(event.x > 607 && event.y > 60 || event.y > 20 && event.x < 497){
      this.mostraMenuconfig = false
      this.mostraMenuCat = false
    }
  }

  mostraMenuconfig: boolean = false

  showMenuconfig():void{
    this.mostraMenuconfig = !this.mostraMenuconfig
    this.mostraMenuCat = false
  }

  mostraMenuCat: boolean = false
  showCategorias():void{
    this.mostraMenuCat = !this.mostraMenuCat
    this.mostraMenuconfig = false
  }

  enterPesquisa(){
    window.location.replace('http://localhost:4200/Pesquisa')
    localStorage.setItem('Pesquisa', JSON.stringify(this.Pesquisa.pesquisa))
  }

}