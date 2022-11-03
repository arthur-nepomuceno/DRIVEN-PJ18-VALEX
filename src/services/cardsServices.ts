import * as cardsRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as companyRepository from "../repositories/companyRepository";

export async function checkApiKey(key: string | string[]){
    const response = await companyRepository.findByApiKey(key);

    if(!response) throw {
        type: "invalid_api_key",
        message: "_this api key does not exist_"
    }

    return;
}

export async function checkEmployeeId(employeeId: number) {
    const response = await employeeRepository.findById(employeeId);

    if(!response) throw {
        type: "invalid_user",
        message: "_this employeeId does not exist_"
    }
    
    return;
}

export async function setCardHolderName(employeeId: number) {
    const response = await employeeRepository.findById(employeeId);

    const { fullName } = response;
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

export async function checkCardType(type: string | any, employeeId: number) {
    const response = await cardsRepository.findByTypeAndEmployeeId(type, employeeId);

    if(response) throw {
        type: "unavailable_card_type",
        message: "_you are already have a card registered with this type_"
    }

    return;
}

export async function setCardNumber() {
    
}

//get expiration date
export async function setExpirationDate(){}

//get security code
export async function setSecurityCode() {
    
}

//encrypt security code
export async function hideSecurityCode(cvc: string){}