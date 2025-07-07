const reservations = {
  bob: { claimed: false },
  ted: { claimed: true }
};

const inputName = 'TeD';
const nameKey = inputName.toLowerCase();

if (reservations[nameKey]) {
  if (!reservations[nameKey].claimed) {
    console.log(`Welcome, ${inputName}`);
    reservations[nameKey].claimed = true;
  } else {
    console.log("Hmm, someone already claimed this reservation");
  }
} else {
  reservations[nameKey] = { claimed: true };
  console.log(`Welcome, ${inputName}. We've added your reservation.`);
}