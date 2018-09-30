<template>
  <div id="add-smoothie" class="container">
    <h2 class="center-align indigo-text"> Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title"> Smoothie Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field title">
        <label for="ingredients"> Add ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="AddIngredient" v-model="another">
      </div>
      <div class="ingredients" v-if="ingredients.length > 0">
        <div v-for="(ing, index) in ingredients" :key="index">
          <label for="ingredient">Ingredient:</label>
          <input type="text" class="chip ingredient" v-model="ingredients[index]">
          <i class="material-icons" @click="removeIngredient(ing)">delete</i>
        </div>
      </div>
      <div class="field center-align">
        <p v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AddSmoothie',
  data () {
    return {
      title: "",
      ingredients: [],
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    AddSmoothie() {
      if (this.title) {
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        this.feedback = null
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        })
        .then(this.$router.push({ name: 'Index' }))
        .catch(error => console.log(error))
      } else {
        this.feedback = "you must enter a smoothie title"
      }
    },
    removeIngredient(ingredient) {
      this.ingredients = this.ingredients.filter(ing => {
        return ing !== ingredient
      })
    },
    AddIngredient() {
      if (this.another) {
        this.ingredients.push(this.another)
        console.log(this.ingredients)
        this.feedback = null
      } else {
        this.feedback = "You must enter a value"
      }
      this.another = null
    }
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
