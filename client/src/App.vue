<template>
  <div id="app">
    <div v-if="currentQuestion.answerImg">
      <img :src="currentQuestion.questionImg">
      <p>{{currentQuestion.questionText}}</p>
      <div>
        <div v-if="currentQuestion.options.length">
          <button v-for="option in currentQuestion.options" :key="option" @click="guess(option)">
            {{option}}
          </button>
        </div>
        <div v-else>
          <button @click="showAnswer = !showAnswer">Show Answer</button>
        </div>
      </div>
      <div v-if="showAnswer" style="margin-top: 20px;">
        <img :src="currentQuestion.answerImg" alt="">
        <p>Answer: {{currentQuestion.answer}}</p>
        <p>Description: {{currentQuestion.answerDescription}}</p>
      </div>
    </div>
    <button @click="nextQuestion()">NEXT</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      currentQuestion: '',
      showAnswer: false
    }
  },
  methods: {
    nextQuestion() {
      this.currentQuestion = this.questions[Math.floor(Math.random() * this.questions.length)]
      this.showAnswer = false
    },
    guess(option) {
      if (option === this.currentQuestion.answer) {
        alert('correct!')
        this.showAnswer = true
      } else {
        alert(`incorrect...`)
        this.showAnswer = true
      }
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    questions: gql`query {
      questions{
        questionImg
        answerImg
        questionText
        options
        answer
        answerDescription
      }
    }`,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
