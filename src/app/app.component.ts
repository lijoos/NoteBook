import { Component, ElementRef, ChangeDetectionStrategy, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { single } from 'rxjs';
import { Note, NoteBookItem } from './notebook/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  noteBook: NoteBookItem[] = [];
  constructor(private el:ElementRef, private window: Window) {
    let data = localStorage.getItem('noteBook');
    // original this.notes = JSON.parse(data!== null? data : '') || [{ id: 0,content:'' }];
    this.noteBook = data!== null? JSON.parse(data) :  [];
  }
  // updateAllNotes() {
  //   let notes = document.querySelectorAll('app-notebook');
  //   notes.forEach((note:any, index)=>{
  //     this.notes[parseInt(note.id)].content = note.querySelector('.content').innerHTML;
  //   });

  //   localStorage.setItem('notes', JSON.stringify(this.notes));

  // }

  addNote () {
    let singleNote:NoteBookItem =  new NoteBookItem(this.noteBook.length + 1,[]);
    this.noteBook.push(singleNote);
    this.noteBook= this.noteBook.sort((a,b)=>{ return b.noteBookItemID-a.noteBookItemID});
    localStorage.setItem('noteBook', JSON.stringify(this.noteBook));
  };
  
  saveNote(event:NoteBookItem){
    const item =  this.noteBook.find((obj)=> {
      if( obj.noteBookItemID== event.noteBookItemID){
        obj.notes = event.notes;
      }
      return obj.noteBookItemID == event.noteBookItemID;
    });
    if( item==undefined && event.noteBookItemID) {
    this.noteBook.push(new NoteBookItem(event.noteBookItemID,event.notes));
    }
    localStorage.setItem('noteBook', JSON.stringify(this.noteBook));
    // const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    // const content = event.target.innerText;
    // event.target.innerText = content;
    // const json = {
    //   'id':id,
    //   'content':content
    // }
   // this.updateNote(json);
   // localStorage.setItem('noteBook', JSON.stringify(this.noteBook));
  }
  
  // updateNote(newValue:any){
  //   this.noteBook.forEach((note, index)=>{
  //     if(note.noteBookItemID== newValue.id) {
  //       this.noteBook[index].content = newValue.content;
  //     }
  //   });
  // }
  
  deleteNote(event:NoteBookItem){
    this.noteBook = this.noteBook.filter((item:NoteBookItem) => {
       return item.noteBookItemID!=event.noteBookItemID;
     });
     localStorage.setItem('noteBook', JSON.stringify(this.noteBook));
  }

  openNewtab() {
  console.log(this.window.open('localhost/4200'));
  }
  
}

