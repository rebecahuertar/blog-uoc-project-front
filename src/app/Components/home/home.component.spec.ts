import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { PostDTO } from '../../Models/post.dto';
import { PostService } from '../../Services/post.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  //declaramos la variable component de tipo HomeComponent
  let component: HomeComponent;
  //declaramos el fixture para poder gestionar posteriormente el component
  let fixture: ComponentFixture<HomeComponent>;

  //antes de cada test
  beforeEach(() => {
    //configuracion del test para un compenente
    //aqui tenemos que importar y vincular todas la dependencias
    TestBed.configureTestingModule({
      //nos hace falta importar el modulo para testear llamadas a una API pero de manera simulada
      imports: [HttpClientTestingModule],
      //en declarations ponemos el componente a testear
      declarations: [HomeComponent],
      //dependencias (normalmente los servicios que tenga inyectados el componente en su constructor)
      //en este caso solo nos haria falta inyectar el servicio PostService
      providers: [PostService],
      //estp se suele poner para evitar errores
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      //importante ejecutar el compileComponents
    }).compileComponents();
  });

  //antes de cada test: instanciamos el componente
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    //hacemos que se instancie el componente y con el detectChanges es como si pasara por el ngOnInit
    fixture.detectChanges();
  });

  //TEST 1: que se cree correctamente el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TEST 2: load posts success
  it('loadPosts success from subscription', () => {
    //definimos la dependencia del servicio
    const postsService = fixture.debugElement.injector.get(PostService);
    //lista de post "mock", en este ejemplo simplemente utilizamos una lista vacia
    const listPosts: PostDTO[] = [];
    //espia para simular el metodo getPosts del servicio
    //le decimos que nos devolvera una lista de posts y que sera un observable, de ahi que utilicemos (of)
    const spy = spyOn(postsService, 'getPosts').and.returnValue(of(listPosts));
    //llamomos al metodo privado loadPosts del componente HomeComponent
    component['loadPosts']();
    //que esperamos? esperamos que el getPosts del PostService sea llamado
    expect(spy).toHaveBeenCalled();
    //que esperamos?
    //esperamos que la variable posts del HomeComponent donde se mapea el resultado de la llamada anterior
    //tenga el numero del posts correcto, en este caso, como listPosts "mock" tiene 0 posts, el resultado esperado tiene que ser 0
    expect(component.posts.length).toBe(0);
  });
});
