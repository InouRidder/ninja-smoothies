<template>
  <div id="index" class="container">
    <div class="row">
      <div class="col xs12 s6" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
              <i class="delete material-icons" @click="removeSmoothie(smoothie.id)">delete</i>
              <router-link :to="{ name: 'EditSmoothie', params: {slug: smoothie.slug}}" class="edit">
                <i class="material-icons">edit</i>
              </router-link>
            <span class="card-title">{{smoothie.title}}</span>
            <ul class="ingredients">
              <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ingredient}}</span>
              </li>
            </ul>
          </div>
          <div class="card-action">
            {{smoothie.slug}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'Index',
    data () {
      return {
        smoothies: [
        ]
      }
    },
    methods: {
      removeSmoothie (id) {
        db.collection('smoothies').doc(id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id !== id
          })
        }).catch(error => console.log(error))
      }
    },
    created() {
      db.collection('smoothies').get()
      .then(snapshot => {
        snapshot.forEach(document => {
          let smoothie = document.data()
          smoothie.id = document.id
          this.smoothies.push(smoothie)
        })
      })
    }

  }
</script>

<style scoped>
.ingredients li {
  display: inline-block;
}

.delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
}
.edit {
  position: absolute;
  top: 4px;
  right: 30px;
  cursor: pointer;
}
</style>
