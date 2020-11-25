import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KaryawanPage } from './karyawan.page';

describe('KaryawanPage', () => {
  let component: KaryawanPage;
  let fixture: ComponentFixture<KaryawanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaryawanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KaryawanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
