import { Component, HostBinding, EventEmitter, Output, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Note, NoteBookItem } from './note';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit{
  config: any;
  collection = { count: 5, data: [] as any []};
  notes: Note[] = [];
  currentNote: Note = new Note('','');
  @Input() notBookItemId!: number;
  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  noteBook: any;
  constructor(private el:ElementRef) {
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1
        }
      );
    }

    this.config = {
      itemsPerPage: 1,
      currentPage: 1,
      totalItems: this.collection.count
    };

    let data = localStorage.getItem('noteBook');
    // original this.notes = JSON.parse(data!== null? data : '') || [{ id: 0,content:'' }];
    this.noteBook = data!== null? JSON.parse(data) :  [];
    }
  ngOnInit(): void {
   this.noteBook.find((obj: NoteBookItem)=>{
      if( obj.noteBookItemID === this.notBookItemId){
        this.notes = obj.notes;
        this.notes.filter((obj: Note)=>{
          if(obj.pageID == "1")
          this.currentNote = obj;
        })
      }
   });
  }
    onDismiss(event:any){
      this.dismiss.emit( this.noteBook.find((obj: NoteBookItem)=>{
        return obj.noteBookItemID === this.notBookItemId;}));
    }
    onFocusOut(event:any, id: any){
       this.currentNote = new Note(id,event.target.innerText);
      const item =  this.notes.find((obj)=> {
        if( obj.pageID=== id){
          obj.content = event.target.innerText;
        }
        return obj.pageID === id;
      });
      if( item==undefined) {
      this.notes.push(this.currentNote);
      }
      this.focusout.emit( new NoteBookItem(this.notBookItemId,this.notes));
    }
    pageChanged(id:any){
      const item =  this.notes.find((obj)=> {
        return obj.pageID === id;
      });
      if(item!==undefined) {
        this.currentNote =item;
      } else{
        this.currentNote = new Note('','');
      }
      this.config.currentPage = id;
    }
  }

