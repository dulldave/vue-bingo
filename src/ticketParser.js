export function createBingoTickets (ticketString) {
  const results = []
  let ticketNumbers = []
  let stringIndex = 0

  for (let index = 0; index < ticketString.length; index += 2) {
    stringIndex++

    ticketNumbers.push({
      number: Number.parseInt(`${ticketString[index]}${ticketString[index + 1]}`, 10),
      called: false
    })

    if (stringIndex === 15) {
      results.push(ticketNumbers)
      ticketNumbers = []
      stringIndex = 0
    }
  }

  return results
}
