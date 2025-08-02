const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true }
}
const input = document.getElementById("input");

const checkReservation = function () {
    const name = input.value;
    if(reservations[name]){
        if(!reservations[name].claimed)
        {
            console.log(`Welcome, ${name}`);
        }
        else{
            console.log(`Hmm, someone already claimed this reservation`);
        }
    }
    else{
        console.log("You have no reservation");
    }
}