<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8 col-sm-10">
        <h4 class="text-center">Criar Knigt</h4>

        <Form @submit="handleSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <Field type="text" name="name" class="form-control" :rules="isRequired" />
            <ErrorMessage name="name" />
          </div>

          <div class="form-group">
            <label for="name">Nickname</label>
            <Field name="nickname" class="form-control" :rules="isRequired" />
            <ErrorMessage name="nickname" />
          </div>

          <div class="form-group">
            <label for="name">Birthday</label>
            <Field name="birthday" type="date" class="form-control" :rules="isRequired" />
            <ErrorMessage name="birthday" />
          </div>

          <div class="form-group">
            <FieldArray name="weapons" v-slot="{ fields, push, remove }">
              <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
                <h6>Arma {{ idx }}</h6>

                <div class="form-group">
                  <label :for="`name_${idx}`">Name</label>
                  <Field :id="`name_${idx}`" :name="`weapons[${idx}].name`" class="form-control" />
                  <ErrorMessage :name="`weapons[${idx}].name`" />
                </div>

                <div class="form-group">
                  <label :for="`name_${idx}`">Mod</label>
                  <Field
                    :id="`name_${idx}`"
                    type="number"
                    :name="`weapons[${idx}].mod`"
                    class="form-control"
                  />
                  <ErrorMessage :name="`weapons[${idx}].mod`" />
                </div>
              </fieldset>
              <div class="row justify-content-between">
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="push({ name: '', mod: '' })"
                  >
                    Add Arma +
                  </button>
                </div>
                <div class="col-2">
                  <button type="button" class="btn btn-danger" @click="remove(idx)">X</button>
                </div>
              </div>
            </FieldArray>
          </div>
          <div class="form-group">
            <label for="name">Força</label>
            <Field
              name="attributes.strength"
              type="number"
              class="form-control"
              :rules="(isRequired, number)"
            />
            <ErrorMessage name="attributes.strength" />
          </div>

          <div class="form-group">
            <label for="name">Destreza</label>
            <Field
              name="attributes.dexterity"
              type="number"
              class="form-control"
              :rules="(isRequired, number)"
            />
            <ErrorMessage name="attributes.dexterity" />
          </div>

          <div class="form-group">
            <label for="name">Constituição</label>
            <Field
              name="attributes.constitution"
              type="number"
              class="form-control"
              :rules="(isRequired, number)"
            />
            <ErrorMessage name="attributes.constitution" />
          </div>

          <div class="form-group">
            <label for="name">Inteligencia</label>
            <Field
              name="attributes.intelligence"
              type="number"
              class="form-control"
              :rules="(isRequired, number)"
            />
            <ErrorMessage name="attributes.intelligence" />
          </div>

          <div class="form-group">
            <label for="name">Sabedoria</label>
            <Field
              name="attributes.wisdom"
              type="number"
              class="form-control"
              :rules="(isRequired, number)"
            />
            <ErrorMessage name="attributes.wisdom" />
          </div>

          <div class="form-group">
            <label for="name">Carisma</label>
            <Field
              name="attributes.charisma"
              type="number"
              class="form-control"
              :rules="(isRequired, number)"
            />
            <ErrorMessage name="attributes.charisma" />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api.js'
import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate'

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    FieldArray
  },
  data() {
    return {
      name: '',
      nickname: '',
      birthday: '',
      weapons: [
        {
          name: 'sword',
          mod: 3,
          attr: 'strength',
          equipped: true
        }
      ],
      attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      },
      keyAttribute: 'strength'
    }
  },
  methods: {
    isRequired(value) {
      if (!value) {
        return 'Campo obrigatório'
      }

      return true
    },
    async handleSubmit(values) {
      try {
        if (values) {
          if (values.weapons) values.weapons[values.weapons.length - 1].equipped = true
          values.keyAttribute = 'strength'
        }

        await this.createKnight(values)
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error)
      }
    },
    async createKnight(values) {
      try {
        await api.post('/knigts', values).then(this.$router.push(`/knigts`))
      } catch (error) {
        console.error('Erro ao criar um novo knight:', error)
        throw error
      }
    }
  }
}
</script>
