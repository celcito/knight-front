<template>
  <div>
    <div class="container">
      <h4>All Knights</h4>
      <div style="display: flex; justify-content: end; margin-bottom: 10px">
        <button @click="createKnight()" class="btn btn-primary">Criar Knigt</button>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Nickname</th>
              <th>Birthday</th>
              <th>Armas</th>
              <th>Exp</th>
              <th>Attack</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="knight in knights" :key="knight.id">
              <td>{{ knight.name }}</td>
              <td>{{ knight.nickname }}</td>
              <td>{{ calcAge(knight.birthday) }}</td>
              <td>{{ knight.weapons.length }}</td>
              <td>{{ getExp(knight.birthday) }}</td>
              <td>{{ calculateAttack(knight) }}</td>
              <td>
                <button style="margin: 3px" @click="editKnight(knight._id)" class="btn btn-primary">
                  Edit
                </button>
                <button @click="deleteKnight(knight._id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api.js'

export default {
  data() {
    return {
      knights: []
    }
  },
  created() {
    this.fetchKnights()
  },
  methods: {
    calcAge(dateString) {
      const today = new Date()
      const birthDate = new Date(dateString)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    },

    getExp(dateString) {
      const isDateFormatValid = (dateString) => {
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/
        return dateFormatRegex.test(dateString)
      }

      if (!isDateFormatValid(dateString)) return ''
      let exp = Math.floor((this.calcAge(dateString) - 7) * Math.pow(22, 1.45))
      if (exp < 0) exp = 0
      return exp
    },

    calculateAttack(character) {
      const keyAttribute = character.attributes[character.keyAttribute]

      let modKeyAttribute
      if (keyAttribute >= 0 && keyAttribute <= 8) {
        modKeyAttribute = -2
      } else if (keyAttribute >= 9 && keyAttribute <= 10) {
        modKeyAttribute = -1
      } else if (keyAttribute >= 11 && keyAttribute <= 12) {
        modKeyAttribute = 0
      } else if (keyAttribute >= 13 && keyAttribute <= 15) {
        modKeyAttribute = 1
      } else if (keyAttribute >= 16 && keyAttribute <= 18) {
        modKeyAttribute = 2
      } else {
        modKeyAttribute = 3
      }

      let equippedWeapon
      for (const weapon of character.weapons) {
        if (weapon.equipped) {
          equippedWeapon = weapon
          break
        }
      }

      if (!equippedWeapon) {
        console.error('Nenhuma arma equipada.')
        return null
      }

      // Calcular o valor do ataque
      const attack = 10 + modKeyAttribute + equippedWeapon.mod

      return attack
    },
    fetchKnights() {
      api
        .get('/knigts')
        .then((response) => {
          this.knights = response.data
          this.knights.forEach((element) => {
            if (element.birthday?.includes('T')) element.birthday = element.birthday?.split('T')[0]
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    editKnight(id) {
      this.$router.push(`/knigts/edit/${id}`)
    },
    createKnight() {
      this.$router.push(`/knigts/create`)
    },

    deleteKnight(id) {
      api
        .delete(`/knigts/${id}`)
        .then(() => {
          this.fetchKnights()
        })
        .catch((error) => {
          console.error('Erro ao deletar o knight:', error)
        })
    }
  }
}
</script>
