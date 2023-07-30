export const calculateAttack=(character)=> {

    const keyAttribute = character.attributes[character.keyAttribute];
  
    let modKeyAttribute;
    if (keyAttribute >= 0 && keyAttribute <= 8) {
      modKeyAttribute = -2;
    } else if (keyAttribute >= 9 && keyAttribute <= 10) {
      modKeyAttribute = -1;
    } else if (keyAttribute >= 11 && keyAttribute <= 12) {
      modKeyAttribute = 0;
    } else if (keyAttribute >= 13 && keyAttribute <= 15) {
      modKeyAttribute = 1;
    } else if (keyAttribute >= 16 && keyAttribute <= 18) {
      modKeyAttribute = 2;
    } else {
   
      modKeyAttribute = 3;
    }
  
    let equippedWeapon;
    for (const weapon of character.weapons) {
      if (weapon.equipped) {
        equippedWeapon = weapon;
        break;
      }
    }
  
    if (!equippedWeapon) {
      console.error('Nenhuma arma equipada.');
      return null;
    }
  
    // Calcular o valor do ataque
    const attack = 10 + modKeyAttribute + equippedWeapon.mod;
  
    return attack;
  }