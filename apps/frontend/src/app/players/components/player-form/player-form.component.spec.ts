import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PlayerFormComponent } from './player-form.component';
import { PreferredPositionEnum } from 'libs/shared/types/src/lib/players/player-position.enum';

describe('PlayerFormComponent', () => {
  let component: PlayerFormComponent;
  let fixture: ComponentFixture<PlayerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerFormComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: null,
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: vi.fn(),
          },
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {
            passedData: {},
        },
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with default values', () => {
    const form = component.form;

    expect(form.getRawValue()).toEqual({
      firstName: '',
      lastName: '',
      preferredPosition: PreferredPositionEnum.MIDFIELDER,
      skillRate: 5,
      nickname: '',
    });
  });

  it('should be invalid when required fields are empty', () => {
    //GIVEN:
    const form = component.form;
    form.patchValue({
        firstName: '',
        lastName: '',
        preferredPosition: null,
        skillRate: null,
        nickname: '',
    })
    form.updateValueAndValidity();
    //THEN:
    expect(form.invalid).toBe(true);
  })

  it('should be valid when all fields are filled correctly without optional fields', () => {
    //GIVEN:
    const form = component.form;
    form.patchValue({
      firstName: 'Jan',
      lastName: 'Kowalski',
      preferredPosition: PreferredPositionEnum.DEFENDER,
      skillRate: 7,
      nickname: '',
    })
    form.updateValueAndValidity();
    //THEN:
    expect(form.valid).toBe(true);
  })
});