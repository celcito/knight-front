import { describe, it, expect } from 'vitest'

import { getExp } from '../../helper/getExp';
import {isDateFormatValid} from '../../helper/dates'

describe('Testes para a função getExp', () => {
  it('Deve retornar "formato de data valido valido', () => {
    const dateString = '2023-07-28'; // Data com formato inválido
    const result = isDateFormatValid(dateString);
    expect(result).toBe(true);
  });



  it('Deve retornar "formato de data inválido" para uma data com formato inválido', () => {
    const dateString = '2023/07/289898'; // Data com formato inválido
    const result = isDateFormatValid(dateString);
    expect(result).toBe(false);
  });



  it('Deve calcular a experiência corretamente para uma data válida', () => {
    const dateString = '2008-01-30'; // Data válida
    const result = getExp(dateString);
    // Para essa data específica, o resultado esperado é 707
    expect(result).toBe(707);
  });

});




