/**
 * Takes the ticket string input and converts it to an array of tickets
 *
 * @export
 * @param {String} ticketString
 * @returns {Array} Returns array of tickets
 */
export function parse (ticketString) {
  if (typeof ticketString !== 'string') {
    throw new Error('Ticket string must be a string')
  }

  if (ticketString.length !== 180) {
    throw new Error('Ticket string must be 180 characters')
  }

  const results = []
  let ticketNumbers = []
  let stringIndex = 0

  // Loop every two characters in the string
  for (let index = 0; index < ticketString.length; index += 2) {
    stringIndex++

    ticketNumbers.push({
      // Use template literal to create two digit string. We then
      // pass the number string to Number.parseInt(), this will convert
      // the string number to an integer. It'll also remove the 0 in 01, etc.
      number: Number.parseInt(`${ticketString[index]}${ticketString[index + 1]}`, 10),
      called: false
    })

    // Every fifteen numbers is equal to one bingo ticket,
    // so we need to push the collected numbers onto the final
    // results array. We then reset all counter and numbers array.
    if (stringIndex === 15) {
      results.push(ticketNumbers)
      ticketNumbers = []
      stringIndex = 0
    }
  }

  return results
}
