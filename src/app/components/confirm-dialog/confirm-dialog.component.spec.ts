import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefMock: { close: jest.Mock };
  const dialogData: ConfirmDialogData = {
    title: 'Confirm',
    message: 'Are you sure?',
    confirmText: 'Yes',
    cancelText: 'No'
  };

  beforeEach(async () => {
    dialogRefMock = { close: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive dialog data via injection', () => {
    expect(component.data).toEqual(dialogData);
  });

  it('should render the title and message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(dialogData.title!);
    expect(compiled.textContent).toContain(dialogData.message);
  });

  it('should render confirm and cancel buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(dialogData.confirmText!);
    expect(compiled.textContent).toContain(dialogData.cancelText!);
  });

  it('should close the dialog when close is called', () => {
    component.dialogRef.close('cancel');
    expect(dialogRefMock.close).toHaveBeenCalledWith('cancel');
  });
});
