import { Component, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked{
    isSignedIn : Boolean = false;
    NavHeadings : String[] = ["Home", "Login", "Signup", "Profile", "Logout"];
    isHovering: boolean = false;
    email : string = this.sessionStorageService.getItem('email')
    constructor(private sessionStorageService : SessionStorageService, private router : Router, private renderer : Renderer2, private cdr: ChangeDetectorRef){
      // const token = this.sessionStorageService.getItem('token')
      // if(token !== null)
      // {
      //   this.isSignedIn = true;
      // }
      // else{
      //   this.isSignedIn = false;
      // }
      //this.checkToken()
    }
    ngAfterViewChecked(): void {
        this.checkToken()
    }
    checkToken()
    {
      const token = this.sessionStorageService.getItem('token')
      if(token !== null)
      {
        this.isSignedIn = true;
      }
      else{
        this.isSignedIn = false;
      }
      this.cdr.detectChanges();
    }
    // ngOnInit(): void {
    //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //   //Add 'implements OnInit' to the class.
    //   this.checkToken()
    // }
    knowMe() {
      console.log('I am Nagendra')
    }
    logMeOut()
    {
      console.log('I am Logging Out')
      this.sessionStorageService.removeItem('email')
      this.sessionStorageService.removeItem('user')
      this.sessionStorageService.removeItem('token')
      
      this.isSignedIn = false;
      this.router.navigateByUrl('/login')
      
    }
    // onImgMouseover($event): void {
    //   const box = document.getElementsByClassName('bg-box-hidden')[0];
    //   box.style.display = 'block';
    // }
    
    // onImgMouseout($event): void {
    //   const box = document.getElementsByClassName('bg-box-hidden')[0];
    //   box.style.display = 'none';
    // }
}