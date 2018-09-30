<template>
  <div id="edit-smoothie" class="container">
    <h2 class="center-align indigo-text" v-if="smoothie"> Edit {{ smoothie.title }}</h2>
    <form @submit.prevent="EditSmoothie" v-if="smoothie">
      <div class="field title">
        <label for="title"> Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div class="field title">
        <label for="ingredients"> New ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="AddIngredient" v-model="another">
      </div>
      <div class="ingredients" v-if="smoothie.ingredients.length > 0">
        <div v-for="(ing, index) in smoothie.ingredients" :key="index">
          <label for="ingredient">Ingredient:</label>
          <input type="text" class="chip ingredient" v-model="smoothie.ingredients[index]">
          <i class="material-icons" @click="removeIngredient(ing)">delete</i>
        </div>
      </div>
      <div class="field center-align">
        <p v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>

    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditSmoothie',
  data () {
    return {
      slug: this.$route.params.slug,
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  methods: {
    EditSmoothie() {
      if (this.smoothie.title) {
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        this.feedback = null
        db.collection('smoothies').doc(this.smoothie.id).update(this.smoothie).then(() => {
          this.$router.push({name: 'Index'})
        }).catch(error => {
          this.feedback = "Something went wrong"
        })
      } else {
        this.feedback = "you must enter a smoothie title"
      }
    },
    AddIngredient() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another)
        this.feedback = null
      } else {
        this.feedback = "You must enter a value"
      }
      this.another = null
    },
    removeIngredient(ingredient) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => {
        return ing !== ingredient
      })
    }
  },
  created () {
    let ref = db.collection('smoothies').where('slug', '==', this.slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothie = smoothie
      })
    })
  }
}


</script>

<style>
  #add-smoothie {
    margin-top: 60px;
  }
  .ingredients li {
  display: inline-block;
}

</style>
