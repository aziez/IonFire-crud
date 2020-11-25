import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface DataKaryawan{
  Nama: string;
  Alamat: string;
  Jabatan: string;

}


@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.page.html',
  styleUrls: ['./karyawan.page.scss'],
})
export class KaryawanPage implements OnInit {
  listKaryawan = [];

  dataKaryawan: DataKaryawan;
  formTambah: FormGroup;
  formEdit: FormGroup;


  constructor( private firebaseService: FirebaseService, public FB: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {
    this.dataKaryawan = {} as DataKaryawan;
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {
      this.formEdit = this.FB.group({
        Nama: ['', [Validators.required]],
        Alamat: ['', [Validators.required]],
        Jabatan: ['', [Validators.required]]
      });

  // Validasi Form Tambah Karyawan
    this.formTambah = this.FB.group({
      Nama: ['', [Validators.required]],
      Alamat: ['', [Validators.required]],
      Jabatan: ['', [Validators.required]]
    });

//Method mengambil data dr firebase
    this.firebaseService.list_karyawan().subscribe(data => {
      this.listKaryawan = data.map(e => {
        return{
          id: e.payload.doc.id,
          Nama: e.payload.doc.data()['Nama'],
          Alamat: e.payload.doc.data()['Alamat'],
          Jabatan: e.payload.doc.data()['Jabatan']
        };
      });
      console.log("Data Berhasil di Ambil <br> " + this.listKaryawan);
    });
  }

//OPEN MODAL
open(addKaryawan){
  this.modalService.open(addKaryawan);
}

openEdit(UpdateKaryawan){
  const ModalRef = this.modalService.open(UpdateKaryawan);
}

//TambahKaryawan
AddKaryawan(){
  this.firebaseService.add_karyawan(this.formTambah.value).then(resp => {
    this.formTambah.reset();
  })
  .catch(error => {
    console.log(error);
  });
}

EditRecord(record) {
  record.isEdit = true;
  record.EditNama = record.Nama;
  record.EditAlamat = record.Alamat;
  record.EditJabatan = record.Jabatan;
}

UpdateRecord(recordRow) {
  let record = {};
  record['Nama'] = recordRow.EditNama;
  record['Alamat'] = recordRow.EditAlamat;
  record['Jabatan'] = recordRow.EditJabatan;
  this.firebaseService.ubah_karyawan(recordRow.id, record);
  recordRow.isEdit = false;
}

//Hapus Data
HapusKaryawan(rowID){
  console.log(rowID);
  this.firebaseService.hapus_karyawan(rowID);
}
}
