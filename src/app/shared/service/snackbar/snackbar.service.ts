import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }
  /**
   * 
   * @param msg 
   * @param type 
   * @param horizontal
   * @param vertical
   * 
   */
  snack(msg: string, type: string, horizontal: MatSnackBarHorizontalPosition = "center", vertical: MatSnackBarVerticalPosition = "top"){
    this.snackBar.open(msg, 'X', {
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: [type],
      duration: 5000
    });
  }

  closeSnack(){
    this.snackBar.dismiss()
  }
}
