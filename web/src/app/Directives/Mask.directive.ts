import { Injectable } from '@angular/core';
import { MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import {
  maskitoPhoneOptionsGenerator,
  maskitoGetCountryFromNumber,
} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

@Injectable({ providedIn: 'root' })
export class MaskDirective {
  //xxx
  readonly cepMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  };

  //xxx.xxx.xxx-xx
  readonly cpfMask: MaskitoOptions = {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  };

  //xx.xxx.xxx/xxxx-xx
  readonly cnpjMask: MaskitoOptions = {
    mask: [
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '/',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  };

  //xxxxxxx
  readonly plateMask: MaskitoOptions = {
    mask: [...Array(7).fill(/^[a-z0-9\s.,/]+$/i)],
  };

  //xxxx-xxxx-xxxx-xxxx
  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(3).fill(/\d/),
    ],
  };

  //+000 00 0000-0000
  readonly phoneMask: MaskitoOptions = maskitoPhoneOptionsGenerator({
    metadata,
    strict: true,
    countryIsoCode: 'BR',
  });

  //R$ 1.000.000,00
  readonly moneyMask: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 2,
    prefix: 'R$ ',
  });

//   readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
//     (el as HTMLInputElement).getInputElement();

  countryIsoCode(value: string): string {
    return maskitoGetCountryFromNumber(value, metadata) || '';
  }

  formatCnpj(cnpj: string): string {
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(
      5,
      8
    )}/${cnpj.substring(8, 12)}-${cnpj.substring(12, 14)}`;
  }

  formatMoney(money: number | string): string {
    let newMoney = String(money);
    const indexMoneySeparator = newMoney.indexOf('.');
    let moneySeparator = ',00';

    if (indexMoneySeparator !== -1) {
      moneySeparator = `,${newMoney.substring(indexMoneySeparator + 1)}`;
      newMoney = newMoney.substring(0, indexMoneySeparator);
    }

    return this.fnCaseMoney(newMoney) + moneySeparator;
  }

  formatMoneyToDecimal(value?: string): number {
    if (value === null) return 0;

    return Number(
      String(value).replace('R$ ', '').replaceAll('.', '').replace(',', '.')
    );
  }

  //Private
  private fnCaseMoney(money: string): string {
    let moneyReturn = '';
    switch (money.length) {
      case 4:
        moneyReturn = `${money.substring(0, 1)}.${money.substring(1)}`;
        break;
      case 5:
        moneyReturn = `${money.substring(0, 2)}.${money.substring(2)}`;
        break;
      case 6:
        moneyReturn = `${money.substring(0, 3)}.${money.substring(3)}`;
        break;
      case 7:
        moneyReturn = `${money.substring(0, 1)}.${money.substring(
          1,
          4
        )}.${money.substring(4)}`;
        break;
      case 8:
        moneyReturn = `${money.substring(0, 2)}.${money.substring(
          2,
          5
        )}.${money.substring(5)}`;
        break;
      case 9:
        moneyReturn = `${money.substring(0, 3)}.${money.substring(
          3,
          6
        )}.${money.substring(6)}`;
        break;
      case 10:
        moneyReturn = `${money.substring(0, 1)}.${money.substring(
          1,
          4
        )}.${money.substring(4, 7)}.${money.substring(7)}`;
        break;
      default:
        moneyReturn = money;
        break;
    }

    return moneyReturn;
  }
}
