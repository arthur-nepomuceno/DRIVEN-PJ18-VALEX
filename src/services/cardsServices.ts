import * as cardsRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";

export async function getCardHolderName(id: number) {
    const result = await employeeRepository.findById(id);

    if(!result) throw {
        type: "invalid_user",
        message: "_this employeeId does not exist_"
    }

    const { fullName } = result;
    const cardholderName = fullName.toUpperCase()
                                .split(' ')
                                .filter(e => e.length >= 3);


    for(let i = 0; i < cardholderName.length; i++){
        if(i !== 0 && i !== cardholderName.length - 1){
            cardholderName[i] = cardholderName[i][0];
        }
    }

    return cardholderName.join(' ');
}

//check x-api-key
//check if card type is free
//get expiration date
//get security code
//encrypt security code