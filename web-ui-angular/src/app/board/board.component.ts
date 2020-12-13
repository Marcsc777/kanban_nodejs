import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board;
  tasks;
  filter;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.getBoardTasks(this.board.id).subscribe((tasks) => {
      console.log('tasks', tasks);
      this.tasks = tasks;
    });
  }

  onFilterChange(): void {
    this.boardService
      .filterTasks(this.board.id, this.filter)
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }
}