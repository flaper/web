/// <reference path="../../../../typingsOurs/main.d.ts" />
import {Injectable} from 'angular2/core';
import {Control, ControlGroup} from 'angular2/common';
import * as _ from 'lodash';

const KEY_PREFIX = 'FORM_DRAFT_';
@Injectable()
export class FormDraft {

  constructor() {
  }

  static save(key, values) {
    values = _.mapValues(values, (value) => {
      return (typeof value === 'string') ? value.trim() : value;
    });
    if (values) {
      localStorage.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(values));
    } else {
      localStorage.removeItem(`${KEY_PREFIX}${key}`);
    }
  }

  static load(key, form:ControlGroup) {
    let data = this._safeLoad(`${KEY_PREFIX}${key}`);
    Object.keys(data).forEach((key) => {
      let value = data[key];
      let control = <Control> form.controls[key];
      if (value && control) {
        control.updateValue(value, true);
      }
    })
  }

  static remove(key) {
    localStorage.removeItem(`${KEY_PREFIX}${key}`);
  }

  private static _safeLoad(key) {
    let value = localStorage.getItem(key);
    if (value) {
      try {
        value = JSON.parse(value);
      } finally {

      }
    }
    if (!value) {
      value = {};
    }
    return value;
  }
}
