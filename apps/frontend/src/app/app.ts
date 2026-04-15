import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'frontend';
  httpService = inject(HttpClient);
  tst!: any;

  ngOnInit(): void {
    this.httpService
      .get<{ message: string }>('http://localhost:3000/api')
      .subscribe((res: { message: string }) => (this.tst = res.message));
  }
}
