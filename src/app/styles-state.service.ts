import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IStylesState {
  darkAppThemeOn: boolean;
  customLightAppThemeOn: boolean;
}

const keyLocalStorStyleState = 'keyLocalStorStyleState';

@Injectable({
  providedIn: 'root',
})
export class StylesStateService {
  private _stylesState$ = new BehaviorSubject<IStylesState>(
    this.getDefaultState()
  );
  public stylesState$ = this._stylesState$.asObservable();

  constructor() {
    this.loadLocalStyleStore();
  }

  loadLocalStyleStore() {
    const localStorStyleStateStr = localStorage.getItem(keyLocalStorStyleState);
    if (!localStorStyleStateStr) {
      this._stylesState$.next(this.getDefaultState());
    } else {
      const localStorStyleStateObj = JSON.parse(
        localStorStyleStateStr
      ) as IStylesState;
      if (localStorStyleStateObj.customLightAppThemeOn) {
        this.setTheme('customLightAppThemeOn');
        return;
      }
      if (localStorStyleStateObj.darkAppThemeOn) {
        this.setTheme('darkAppThemeOn');
        return;
      }
      this._stylesState$.next(this.getZeroState());
    }
  }

  saveLocalStyleStore(state) {
    localStorage.setItem(keyLocalStorStyleState, JSON.stringify(state));
  }

  getDefaultState(): IStylesState {
    return {
      darkAppThemeOn: false,
      customLightAppThemeOn: true,
    };
  }

  getZeroState(): IStylesState {
    return {
      darkAppThemeOn: false,
      customLightAppThemeOn: false,
    };
  }

  setTheme(theme: string): void {
    const state: IStylesState = {
      darkAppThemeOn: false,
      customLightAppThemeOn: false,
    };
    if (theme === 'darkAppThemeOn') {
      state.darkAppThemeOn = true;
    }
    if (theme === 'customLightAppThemeOn') {
      state.customLightAppThemeOn = true;
    }
    this._stylesState$.next(state);
    this.saveLocalStyleStore(state);
  }
}
