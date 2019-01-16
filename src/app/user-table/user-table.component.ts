import { Component, OnInit, Input } from '@angular/core';
import Table from 'src/models/Table';
import { RestService } from '../rest.service';
import { Certificate } from '../../models/Certifiate';
import * as RSA from '../../RSALib';
import * as bigInt from 'big-integer';
import {Buffer} from 'buffer';
import * as hash from 'hash.js';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  constructor(private rest: RestService) { }

  @Input() table: Table;
  certificate: Certificate;
  selectedCandidate: number;

  ngOnInit() {
  }

  loadCertificate(evt) {
    const files = <FileList>evt.target.files;
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        console.log(reader.result);
        this.certificate = <Certificate>JSON.parse(<string>reader.result);
      }.bind(this);
      reader.readAsText(files[0]);
    }
  }

  sendVote() {
    let vote = '';
    for (let x = 0; x < this.table.candidates.length; x++) {
      if ( x === this.selectedCandidate) {
        vote += '1';
      } else {
        vote += '0';
      }
      if (x !== this.table.candidates.length - 1) {
        vote += ';';
      }
    }

    const tableKey = new RSA.PublicKey();
    tableKey.keyNumber = bigInt(this.table.publicKey.keyNumber, 16);
    tableKey.mod = bigInt(this.table.publicKey.mod, 16);
    vote = tableKey.encrypt(bigInt(Buffer.from(vote).toString('hex'), 16)).toString(16);

    const privateIdentityKey = new RSA.PrivateKey();
    privateIdentityKey.keyNumber = bigInt(this.certificate.privateIdentity.split('.')[0], 16);
    privateIdentityKey.mod = bigInt(this.certificate.privateIdentity.split('.')[1], 16);

    const firmVote = privateIdentityKey.sign(bigInt(hash.sha256().update(vote).digest('hex'), 16)).toString(16);
    const identity = this.certificate.publicIdentity;
    const firmIdentity = this.certificate.firmIdentity;
    this.rest.addVote(this.table.tableId, vote, firmVote, identity, firmIdentity).subscribe((resp) => {

    });
  }

  selectCandidate(index: number) {
    console.log(index);
    this.selectedCandidate = index;
  }
}
