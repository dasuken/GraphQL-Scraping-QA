const fetch = require('node-fetch')
const cheerio = require('cheerio')
const images = require('./db/images')

const url = 'https://www.rd.com/list/trivia-questions/'

getTriviaPage = async (n) => {
  if (n > 5) {
    console.log('Argument must less then 6')
    return
  }

  const startCount = (n - 1)/10
  const endCount = n * 10 - 1
  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)
  const contents = $('.listicle-card')
  const containers = contents.slice(startCount, endCount)
  const questions = []

  for (let i = 0; i < containers.length; i += 2) {
    const questionContainer = $(containers[i])
    const answerContainer = $(containers[i+1])
    const options = []
    const questionImg = $(questionContainer.find('img')).attr('src')
    let questionText = $(questionContainer.find('.card-content p')[1]).text().trim()
    if(questionText.startsWith('A') || questionText.startsWith('B')) {
      questionText = $(questionContainer.find('img')).attr('alt')
    }
    const answerDescription = $(answerContainer.find('.card-content p')[1]).text()

    questionContainer.find('p').each((i, element) => {
      const text = $(element).text().trim()
      const matching = /^[A-D]\.\s(.*)/g.exec(text)
      if (matching) {
        options.push(matching['input'])
      }
    })

    const answer = $(answerContainer.find('h2')).text().split(': ')[1]

    questions.push({
      questionImg,
      questionText,
      options,
      answer,
      answerDescription
    })
  }
  console.log(questions);
  return questions
}

getAllTriviaPage = async () => {
  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)
  const containers = $('.listicle-card')
  const questions = []

  for (let i = 0; i < containers.length; i += 2) {
    const questionContainer = $(containers[i])
    const answerContainer = $(containers[i+1])
    const options = []
    const questionImg = images[i]
    const answerImg = images[i+1]
    let questionText = $(questionContainer.find('.card-content p')[1]).text().trim()
    if(questionText.startsWith('A') || questionText.startsWith('B')) {
      questionText = $(questionContainer.find('img')).attr('alt')
    }
    const answerDescription = $(answerContainer.find('.card-content p')[1]).text()

    questionContainer.find('p').each((i, element) => {
      const text = $(element).text().trim()
      const matching = /^[A-D]\.\s(.*)/g.exec(text)
      if (matching) {
        options.push(matching['input'])
      }
    })

    const answer = $(answerContainer.find('h2')).text().split(': ')[1]

    questions.push({
      questionImg,
      answerImg,
      questionText,
      options,
      answer,
      answerDescription
    })
  }
  console.log(questions);
  return questions
}

getTriviaPage(6)
getAllTriviaPage()

module.exports = getAllTriviaPage