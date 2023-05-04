import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  todo : string[]= [];

  inProgress : string[] = []
  done : string[]= [];
  todoInput : string = ''
  getData()
  {
    const params : Object= {
      'email' : this.sessionStorageService.getItem('email')
    }
    console.log('params ', params)
    const token : string = this.sessionStorageService.getItem('token')
    console.log('token ', token)
   this.dataService.getData(params, token).subscribe((result)=> {
      console.log('body ' ,result.data)
      console.log(result)
      const res = result.data.data
      this.todo = res.todo
      this.done = res.done
      this.inProgress = res.inProgress
      console.log(this.todo)
      console.log(this.inProgress)
      console.log(this.done)
   }, (error)=> {
    console.log('error ', error)
   })
  }
  constructor(public dataService : DataService, public sessionStorageService : SessionStorageService, public router : Router){
    //this.getData()
        
    this.getData()
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const tokenTmp : string | null = this.sessionStorageService.getItem('token')
    if(tokenTmp === null) this.router.navigateByUrl('/login')
  }
  deleteTodo(item : string)
  {
    this.todo = this.todo.filter((val) => val !== item)
    const tokenTmp : string = this.sessionStorageService.getItem('token')
    const email : string = this.sessionStorageService.getItem('email')
    this.dataService.editData({'todo': this.todo, 'email': email}, tokenTmp).subscribe((result)=> {
      console.log(result.data)
    }, (error)=> {
      console.log(error)
    })
  }
  deleteInProgress(item : string)
  {
    this.inProgress = this.inProgress.filter((val) => val !== item)
    const tokenTmp : string = this.sessionStorageService.getItem('token')
    const email : string = this.sessionStorageService.getItem('email')
    this.dataService.editData({'inProgress': this.inProgress, 'email': email}, tokenTmp).subscribe((result)=> {
      console.log(result.data)
    }, (error)=> {
      console.log(error)
    })
  }

  deleteDone(item : string)
  {
    this.done = this.done.filter((val) => val !== item)
    const tokenTmp : string = this.sessionStorageService.getItem('token')
    const email : string = this.sessionStorageService.getItem('email')
    this.dataService.editData({'done': this.done, 'email': email}, tokenTmp).subscribe((result)=> {
      console.log(result.data)
    }, (error)=> {
      console.log(error)
    })
  }

  addTodo()
  {
    if(this.todoInput === '') return;
    this.todo.push(this.todoInput)
    const tokenTmp : string = this.sessionStorageService.getItem('token')
    const email : string = this.sessionStorageService.getItem('email')
    this.dataService.editData({'todo': this.todo, 'done' : this.done, 'inProgress': this.inProgress, 'email' : email}, tokenTmp).subscribe((result)=> {
      console.log(result.data)
    }, (error)=> {
      console.log('error ', error)
    })
    this.todoInput = ''
    
  }


  drop(event: CdkDragDrop<string[]>) {

    if (!Array.isArray(event.container.data)) {
      console.error('Error: event.container.data is not an array.');
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const tokenTmp : string = this.sessionStorageService.getItem('token')
    const email : string = this.sessionStorageService.getItem('email')
    this.dataService.editData({'todo': this.todo, 'done' : this.done, 'inProgress': this.inProgress, 'email' : email}, tokenTmp).subscribe((result)=>{
        console.log(result.data)
        console.log(result.data._fieldsProto)
        // this.todo = []
        // result.data._fieldsProto.todo.arrayValue.values.forEach((val:any)=> {
        //   this.todo.push(val.stringValue)
        // })
        // this.inProgress = []
        //  result.data._fieldsProto.inProgress.arrayValue.values.forEach((val:any)=> {
        //   this.inProgress.push(val.stringValue)
        //  })
        // this.done = [] 
        // result.data._fieldsProto.done.arrayValue.values.forEach((val:any)=> {
        //   this.done.push(val.stringValue)
        // })
        // console.log(this.todo)
        // console.log(this.done)
        // console.log(this.inProgress)
    }, (error)=> {
        console.log('error ', error)
    })
  }
}
