import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  ListKaryawan = 'Karyawan';

  constructor(private firestore: AngularFirestore) { }

  add_karyawan(record){
    return this.firestore.collection(this.ListKaryawan).add(record);
  }

  list_karyawan(){
    return this.firestore.collection(this.ListKaryawan).snapshotChanges();
  }

  ubah_karyawan(recordID, record){
    this.firestore.doc(this.ListKaryawan + '/' + recordID).update(record);
  }

  hapus_karyawan(record_id){
    console.log(record_id);
    this.firestore.doc(this.ListKaryawan + '/' + record_id).delete();
    this.firestore.doc(this.ListKaryawan);
  }

}
