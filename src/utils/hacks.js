import { sha256 } from "crypto-hash";

/*
Function to simulate a show queue.
Return an array content 32 elements on this structure:
{
    id: string,
    arrived: Date,
    serviceStarted: Date,
    serviceEnded: Date
}
The arrived time starts at 07 may 2022 21:43:36
Next arrivals are random between 2 and 10 minutes, with a 60% chance of being longer than 4 minutes
The waiting time before service start is random between 5 and 20 minutes
The service time is random between 1 and 2 minutes
Some customers arrive together and are served practically together
there is a 65% chance that the customer will arrive together with at least 1 at most 2 other customers
*/

// Get a random number between min and max
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addMinutesToDate = (date, minutes) => {
    const seconds = getRandomNumber(3, 7)*1000;
    return new Date(date.getTime() + (minutes * 60000) + seconds);
}

const addSecondsToDate = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000);
}

const isAccompanied = () => {
    const chance = getRandomNumber(1, 100);
    if (chance <= 65) {
        return true;
    }
    if (chance > 65 && chance <= 100) {
        return false;
    }
}

const simulate = () => {
    const clients = [];
    const startDate = new Date("2022-05-07T21:43:36");
    let arrived = startDate;

    let serviceStarted, serviceEnded;
    for (let i = 0; i < 33; i++) {
        const accompanied = i > 3 ? isAccompanied() : false;
        if (i === 0) {
            arrived = startDate;
            serviceStarted = addMinutesToDate(arrived, getRandomNumber(5, 20));
            serviceEnded = addMinutesToDate(serviceStarted, getRandomNumber(1, 2));
        }
        else {
            if (accompanied) {
                arrived = addSecondsToDate(clients[i - 1].arrived, getRandomNumber(1, 5));
            } else {
                arrived = addMinutesToDate(clients[i - 1].arrived, getRandomNumber(1, 6));
            }
        }
        if (accompanied) {
            serviceStarted = addSecondsToDate(clients[i - 1].serviceStarted, getRandomNumber(20, 40));
            serviceEnded = addSecondsToDate(clients[i - 1].serviceEnded, getRandomNumber(20, 40));

        } else {
            serviceStarted = addMinutesToDate(arrived, getRandomNumber(5, 20));
            serviceEnded = addMinutesToDate(serviceStarted, getRandomNumber(1, 2));
        }
        const newUser = {
            id: sha256(startDate.toString()).then(hash => hash.toString('hex')),
            arrived,
            serviceStarted,
            serviceEnded,
            accompanied
        };
        clients.push(newUser);
    }
    return clients;
}

export default simulate;