import * as cardsRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as companyRepository from "../repositories/companyRepository";
import { CardInsertData } from "../repositories/cardRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

export async function checkApiKey(key: string | string[]) {
    const response = await companyRepository.findByApiKey(key);

    if (!response) throw {
        type: "invalid_api_key",
        message: "_this api key does not exist_"
    }

    return;
}

export async function checkEmployeeId(employeeId: number) {
    const response = await employeeRepository.findById(employeeId);

    if (!response) throw {
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


    for (let i = 0; i < cardholderName.length; i++) {
        if (i !== 0 && i !== cardholderName.length - 1) {
            cardholderName[i] = cardholderName[i][0];
        }
    }

    return cardholderName.join(' ');
}

export async function checkCardType(type: string | any, employeeId: number) {
    const response = await cardsRepository.findByTypeAndEmployeeId(type, employeeId);

    if (response) throw {
        type: "unavailable_card_type",
        message: "_you are already have a card registered with this type_"
    }

    return;
}

export async function setCardNumber() {
    const n1 = faker.datatype.number({min: 1000, max: 9999});
    const n2 = faker.datatype.number({min: 1000, max: 9999});
    const n3 = faker.datatype.number({min: 1000, max: 9999});
    const n4 = faker.datatype.number({min: 1000, max: 9999});
    
    return `${n1}` + `${n2}` + `${n3}` + `${n4}`;
}

export async function setExpirationDate() {
    const date = dayjs().add(5, 'years').format('MM/YY');
    return date;
 }

export async function setSecurityCode() {
    const cvc = faker.datatype.number({min: 100, max: 999});
    return cvc;
}

export async function hideSecurityCode(cvc: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    return cryptr.encrypt(cvc);
 }

export async function insertCard(object: CardInsertData) {
    return await cardsRepository.insert(object);
}