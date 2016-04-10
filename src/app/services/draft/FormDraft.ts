/// <reference path="../../../../typingsOurs/main.d.ts" />
import {Injectable} from 'angular2/core';
import {Control, ControlGroup} from 'angular2/common';
var _mapValues = require('lodash/mapValues');

const KEY_PREFIX = 'FORM_DRAFT_';
@Injectable()
export class FormDraft {

  constructor() {
  }

  static save(key, value) {
    FormDraft.requireKey(key);

    value = _mapValues(value, (value) => {
      return (typeof value === 'string') ? value.trim() : value;
    });

    if (value) {
      let data = {
        date: new Date(),
        value: value
      };
      ls.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(data));
    } else {
      ls.removeItem(`${KEY_PREFIX}${key}`);
    }
  }

  static load(key, form:ControlGroup, minDate = new Date(0)) {
    FormDraft.requireKey(key);
    minDate = minDate ? minDate : new Date(0);

    let data = this._safeLoad(`${KEY_PREFIX}${key}`, minDate);
    Object.keys(data).forEach((key) => {
      let value = data[key];
      let control = <Control> form.controls[key];
      if (value && control) {
        control.updateValue(value, {});
      }
    })
  }

  static remove(key) {
    ls.removeItem(`${KEY_PREFIX}${key}`);
  }

  private static _safeLoad(key, minDate) {
    let data = ls.getItem(key);
    if (!data) {
      return {};
    }

    try {
      data = JSON.parse(data);
      var value = data.value;
      var cacheDate = new Date(data.date);
    } catch (e) {
      return {};
    }

    if (!value || !cacheDate || cacheDate < minDate) {
      value = {};
    }
    return value;
  }

  private static requireKey(key) {
    if (!key) {
      throw  'FormDraft key should not be null';
    }
  }
}
