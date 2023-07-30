import { describe, it, expect } from 'vitest'

import {calculateAttack } from '../../helper/getAttack'


describe('Testes para a função calculateAttack', () => {
    it('Deve calcular o ataque corretamente com atributo-chave entre 0-8', () => {
      const character = {
        attributes: { strength: 6 },
        weapons: [{ name: 'sword', mod: 3, attr: 'strength', equipped: true }],
        keyAttribute: 'strength',
      };
  
      const result = calculateAttack(character);
      expect(result).toBe(10 + -2 + 3); // 10 + mod(-2) + equippedWeapon.mod(3) = 11
    });
  
    it('Deve calcular o ataque corretamente com atributo-chave entre 9-10', () => {
      const character = {
        attributes: { strength: 10 },
        weapons: [{ name: 'sword', mod: 3, attr: 'strength', equipped: true }],
        keyAttribute: 'strength',
      };
  
      const result = calculateAttack(character);
      expect(result).toBe(10 + -1 + 3); // 10 + mod(-1) + equippedWeapon.mod(3) = 12
    });
  
    it('Deve calcular o ataque corretamente com atributo-chave entre 11-12', () => {
      const character = {
        attributes: { strength: 12 },
        weapons: [{ name: 'sword', mod: 3, attr: 'strength', equipped: true }],
        keyAttribute: 'strength',
      };
  
      const result = calculateAttack(character);
      expect(result).toBe(10 + 0 + 3); // 10 + mod(0) + equippedWeapon.mod(3) = 13
    });
  
  });