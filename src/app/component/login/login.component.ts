import { NgPlural } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email : string = ''
  password : string = ''
  user : any ={};
  token : string = '';
  constructor(public auth: AngularFireAuth, public sessionStorageService: SessionStorageService, private router : Router){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.sessionStorageService.getItem('token'))
    if(this.sessionStorageService.getItem('token') !== null)
    {
      this.router.navigateByUrl('/')
    }
  }
  onSubmit(){
    this.auth.signInWithEmailAndPassword(this.email, this.password).then((res)=>{
      console.log(res)
      this.user = res.user;
      console.log(this.user.email)
      console.log(this.user)
      this.sessionStorageService.setItem('email', this.user.email)
      this.sessionStorageService.setItem('user', JSON.stringify(this.user))
      this.user.getIdToken().then((token: any)=>{
        this.token = token;
        console.log('token ', this.token)
        this.sessionStorageService.setItem('token', this.token)
        
      })
      console.log('navigating')
      this.router.navigateByUrl('/')

    }).catch((error) => {
     // console.log('error ', error)
      switch (error.code) {
        case 'auth/wrong-password':
            alert('incorrect password for email');
            break;
        case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
        default:
           console.log('error')
    }
    })
  }
}
