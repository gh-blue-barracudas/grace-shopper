'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = [
    {
      productName: 'GOT Dreams?',
      price: 500.00,
      description:
        'You construct the last season of Game of Thrones better than anyone could ever imagine, including yourself. Bonus, you wake up and actually remember parts of it to tell people.',
      imageUrl: 'https://i.imgur.com/OiOIPOU.jpg ',
      productType: 'dream'
    },
    {
      productName: 'Stormy',
      price: 3.00,
      description: `You’re on a boat, massive waves are crashing against the ship as a hurricane or massive storm approaches. Think scenes from ‘Adrift’ or ‘The Perfect Storm’ that you know ends in probable death(by drowning). Hopefully you’ll wake up before...`,
      imageUrl: 'https://i.imgur.com/HGzVGO2.jpg',
      productType: 'nightmare'
    },
    {
      productName: 'Spy Romance',
      price: 300.00,
      description: `Get ready for incredible adrenaline and oxytocin rushes! You’re indisputably one of the world’s best spies. You are sent on a mission to a beautiful tropical island and are informed you’ve been assigned a partner to help crack down on a nefarious drug ring. You’re taken aback when you realize your partner is not only talented at his job, but also exactly your ideal type. Experience immense thrills tracking down your targets and escaping close calls, while also growing closer to your partner. Your dream ends with a mission success and an epic kiss with your partner set against the backdrop of a beach with a romantic sunset.`,
      imageUrl: 'https://i.imgur.com/92owuo8.jpg',
      productType: 'dream'
    },
    {
      productName: 'Major Failures',
      price: 3.00,
      description: `You’re entering finals season in college when you realize you’re still enrolled in the class you thought you withdrew from at the start of semester. You speak to the professor who has no sympathy for you and tells you you have no choice but to take the exam as you’ve received zeros on all his other mandatory course assignments. You enter the dark, chilly exam room in hopes that the exam is multiple choice and you can get some points to only find out the whole exam is open-ended. The race against time is on where you futilely and anxiously try to save your already mediocre GPA.`,
      imageUrl: 'https://i.imgur.com/ALNleiG.jpg',
      productType: 'nightmare'
    },
    {
      productName: 'Free Money',
      price: 200.00,
      description: `You’re entering finals season in college when you realize you’re still enrolled in the class you thought you withdrew from at the start of semester. You speak to the professor who has no sympathy for you and tells you you have no choice but to take the exam as you’ve received zeros on all his other mandatory course assignments. You enter the dark, chilly exam room in hopes that the exam is multiple choice and you can get some points to only find out the whole exam is open-ended. The race against time is on where you futilely and anxiously try to save your already mediocre GPA.`,
      imageUrl: 'https://i.imgur.com/cyQM603.jpg',
      productType: 'dream'
    },
    {
      productName: 'Waning Programming',
      price: 10.00,
      description: `This potion is very effective on making someone else forget all the knowledge s/he got through her/his entire life about programming. Also, this should be performed during a waning moon.`,
      imageUrl: 'https://i.imgur.com/Vu6CjEb.jpg',
      productType: 'nightmare'
    },
    {
      productName: 'Infinite Loop',
      price: 3.00,
      description: `Your React Components aren’t rendering and you get thrown for an infinite recursive loop on the backsplash of VSC.`,
      imageUrl: 'https://i.imgur.com/2N3Hwp2.jpg',
      productType: 'nightmare'
    },
    {
      productName: 'Great Gatsby',
      price: 2000.00,
      description: `You have just bought the largest castle in New York and get to throw Great Gatsby-level house parties every evening without ever being hungover.`,
      imageUrl: 'https://i.imgur.com/WleyUdX.png',
      productType: 'dream'
    }
  ]

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
