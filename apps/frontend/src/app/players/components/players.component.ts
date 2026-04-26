import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  PaginationMeta,
  Player,
  PlayersListQuery,
  PlayersListResponse,
  PlayerSortBy,
  PreferredPositionEnum,
  SortOrder,
} from '@fair-play-app/types';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-players',
  templateUrl: 'players.component.html',
  styleUrls: ['players.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
  ],
})
export class PlayerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private playersService = inject(PlayersService);
  private fb = new FormBuilder();

  totalItems = 0;
  pageIndex = 0;
  pageSize = 10;

  currentSort?: Sort;

  dataSource = new MatTableDataSource<Player>();

  form = this.fb.group({
    firstName: this.fb.control<string | null>(null),
    lastName: this.fb.control<string | null>(null),
    preferredPosition: this.fb.control<PreferredPositionEnum | null>(null),
    isApproved: this.fb.control<boolean | null>(null),
  });

  playersListFromResolver = this.route.snapshot.data[
    'playersList'
  ] as PlayersListResponse;

  positionList = [
    {
      viewValue: 'Obrońca',
      value: 'DEFENDER',
    },
  ];

  yesNoList = [
    {
      viewValue: 'TAK',
      value: true,
    },
    {
      viewValue: 'NIE',
      value: false,
    },
  ];

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'preferredPosition',
    'isApproved',
    'nickname',
    'skillRate',
  ];

  ngOnInit(): void {
    this.setPlayersData(this.playersListFromResolver.data);
    this.setPaginationData(this.playersListFromResolver.meta);
  }

  onSearch(): void {
    this.pageIndex = 0;
    this.getPlayers();
  }

  onSortChange(sort: Sort): void {
    this.currentSort = sort;
    this.pageIndex = 0;
    this.getPlayers();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPlayers();
  }

  getPlayers($event?: Sort) {
    const payload = this.buildPlayersListQuery($event);
    this.playersService.getPlayers(payload).subscribe((playersList) => {
      this.setPlayersData(playersList.data);
      this.setPaginationData(playersList.meta);
    });
  }

  private setPlayersData(players: Player[]): void {
    this.dataSource.data = players;
  }

  private setPaginationData(meta: PaginationMeta): void {
    this.pageIndex = meta.page - 1;
    this.pageSize = meta.limit;
    this.totalItems = meta.totalItems;
  }

  private buildPlayersListQuery($event?: Sort): PlayersListQuery {
    const formValue = this.form.getRawValue();

    return {
      firstName: formValue.firstName ?? undefined,
      lastName: formValue.lastName ?? undefined,
      preferredPosition: formValue.preferredPosition ?? undefined,
      isApproved: formValue.isApproved ?? undefined,
      page: this.pageIndex + 1,
      limit: this.pageSize,
      sortBy: $event?.active as PlayerSortBy,
      sortOrder: $event?.direction as SortOrder,
    };
  }
}
