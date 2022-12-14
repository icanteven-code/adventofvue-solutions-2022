export const hasDuplicateInArray = arr => {
  return new Set(arr).size !== arr.length
}

export const hasDuplicates = list => {
  const nameList = list.map(person => person.name)
  const emailList = list.map(person => person.email)
  return hasDuplicates(nameList) || hasDuplicates(emailList)
}

const shuffleArray = (list) => {
  const array = [...list]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

const arePeopleDifferent = (receiver, giver) => {
  return receiver.name === giver.name && receiver.email === giver.email
}
// Original solution
export const matchPeople = people => {
  const shuffledPeople = shuffleArray(people)

  if (arePeopleDifferent(people[people.length - 1], shuffledPeople[shuffledPeople.length - 1])) {
    const lastItem = shuffledPeople.pop()
    shuffledPeople.unshift(lastItem)
  }

  let secretSantaList = []

  people.forEach(giver => {
    let shuffledIdx = 0;
    let receiver = shuffledPeople[shuffledIdx];

    if (arePeopleDifferent(receiver, giver)) {
      shuffledIdx = 1;
      receiver = shuffledPeople[shuffledIdx];
    }

    secretSantaList.push({ giver, receiver })
    shuffledPeople.splice(shuffledIdx, 1)
  })

  return secretSantaList
}


// Solution example
// export const matchPeople = people => {
//   let pool = [...people]
//   pool.sort(() => 0.5 - Math.random())
  
//   let secretSantaList = []
//   people.forEach(person => {
//     const secretSanta = pool.find(poolPerson => poolPerson.email !== person.email)

//     if (secretSanta) {
//       // Successful match!
//       // Removing secret santa from the pool.
//       pool = pool.filter(poolPerson => poolPerson.email !== secretSanta.email)
//       secretSantaList.push({ receiver: person, giver: secretSanta })
//     } else {
//       // The last person left in the pool is the giver themselve!
//       // In this case, we swap them out with the last successfully assigned pair.
//       const lastSecretSanta = secretSantaList[0]
//       const newSecretSantaIndex = secretSantaList.findIndex(lastPerson => {
//         return lastPerson.email !== lastSecretSanta.giver.email
//       })
//       secretSantaList.push({
//         receiver: person,
//         giver: secretSantaList[newSecretSantaIndex].giver,
//       })
//       secretSantaList[newSecretSantaIndex].secretSanta = person
//     }
//   })

//   return secretSantaList
// }
