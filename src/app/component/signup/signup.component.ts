import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email : string = '';
  password : string = '';
  response : string = ''
  resp : boolean = false
  name : string = '';
  confirmPassword : string = '';
  resultUser : string = ''
  code : Number = 0;
  constructor(private router : Router, private dataService : DataService){

  }
  onSubmit(){
    console.log(this.name)
    console.log(this.email)
    console.log(this.password)
    
    console.log(this.confirmPassword)
    if(this.password !== this.confirmPassword)
    {
      alert('Password and Confirm Password are not equal')
      return;
    }
    this.dataService.registerUser({
      'email': this.email,
      'name': this.name, 
      'password' : this.password
    }).subscribe((result)=> {
      console.log(result)
      this.resultUser = result
      console.log('data ', result.data)
      console.log(result.status)
      this.response = 'successfully Created Account...'
      this.code = 1
      this.resp = true
    }, (error)=> {
      console.log(error)
      console.log(error.status)
      this.resultUser = error
      this.response = 'Error, Password is Invalid'
      this.code = -1
      this.resp = false
    })
    console.log(this.resultUser)
    // this.email = ''
    // this.confirmPassword = ''
    // this.password = ''
    // this.name = ''

  }
}
