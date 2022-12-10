import * as cardsRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as businessRepository from "../repositories/businessRepository";
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
    const n1 = faker.datatype.number({ min: 1000, max: 9999 });
    const n2 = faker.datatype.number({ min: 1000, max: 9999 });
    const n3 = faker.datatype.number({ min: 1000, max: 9999 });
    const n4 = faker.datatype.number({ min: 1000, max: 9999 });

    return `${n1}` + `${n2}` + `${n3}` + `${n4}`;
}

export async function setExpirationDate() {
    const date = dayjs().add(5, 'years').format('MM/YY');
    return date;
}

export async function setSecurityCode() {
    const cvc = faker.datatype.number({ min: 100, max: 999 });
    return cvc;
}

export async function hideData(data: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    return cryptr.encrypt(data);
}

export async function showData(data: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    return cryptr.decrypt(data);
}

export async function insertCard(object: CardInsertData) {
    return await cardsRepository.insert(object);
}

export async function checkCardId(id: number) {
    const response = await cardsRepository.findById(id);

    if (!response) throw {
        type: "invalid_card_id",
        message: "_this card does not exist_"
    }

    return;
}

export async function checkCardExpirationDate(id: number) {
    const response = await cardsRepository.findById(id);
    const { expirationDate } = response;

    const currentMonth = Number(dayjs().format('MM/YY').split('/')[0]);
    const currentYear = Number(dayjs().format('MM/YY').split('/')[1]);
    const expirationMonth = Number(expirationDate.split('/')[0]);
    const expirationYear = Number(expirationDate.split('/')[1]);

    if (currentYear > expirationYear) throw {
        type: "card_expired",
        message: "_this card has already expired_"
    }

    if (currentYear === expirationYear && currentMonth > expirationMonth) throw {
        type: "card_expired",
        message: "_this card has already expired_"
    }

    return;
}

export async function checkIfCardIsActive(id: number) {
    const response = await cardsRepository.findById(id);
    if (response.password) throw {
        type: "active_card",
        message: "_this card is already active_"
    }

    return;
}

export async function checkIfCardIsUnactive(id: number) {
    const response = await cardsRepository.findById(id);
    if (!response.password) throw {
        type: "unactive_card",
        message: "_this card is unactive_"
    }

    return;
}

export async function checkSecurityCode(id: number, securityCode: number) {
    const response = await cardsRepository.findById(id);

    const showSecurityCode = await showData(response.securityCode);

    if (Number(showSecurityCode) !== securityCode) throw {
        type: "invalid_security_code",
        message: "_the security code you are supplying does not match our database_"
    }

    return;
}

export async function activateCard(id: number, password: string) {

    return await cardsRepository.update(id, { password, isBlocked: false })
}

export async function viewEmployeeCards(id: number) {
    const response = await cardsRepository.findCardsByEmployeeId(id);
    const cards = [];
    for (let i = 0; i < response.rows.length; i++) {
        const element = response.rows[i];
        const { number, cardholderName, expirationDate, securityCode, isBlocked, isVirtual } = element;
        cards.push({
            number,
            cardholderName,
            expirationDate,
            securityCode: await showData(securityCode),
            isBlocked,
            isVirtual
        })
    }
    return { cards }
}

export async function getCardBalance(id: number) {
    const payments = await paymentRepository.findByCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);

    let balance: number = 0;
    for (let i = 0; i < recharges.length; i++) {
        balance += recharges[i].amount;
    }
    for (let i = 0; i < payments.length; i++) {
        balance -= payments[i].amount;
    }

    return { balance, transactions: payments, recharges };
}

export async function checkPassword(id: number, password: string) {
    const card = await cardsRepository.findById(id)

    const truePassword = await showData(card.password);

    if (password != truePassword) throw {
        type: "invalid_password",
        message: "_the password you are using is invalid_"
    }

    return;
}

export async function checkIfCardIsBlocked(id: number) {
    const { isBlocked } = await cardsRepository.findById(id);

    if (isBlocked) throw {
        type: "blocked_card",
        message: "_this card is already blocked_"
    }

    return;
}

export async function blockCard(id: number) {
    await cardsRepository.update(id, { isBlocked: true });
    return;
}

export async function checkIfCardIsUnblocked(id: number) {
    const { isBlocked } = await cardsRepository.findById(id);

    if (!isBlocked) throw {
        type: "unblocked_card",
        message: "_this card is already unblocked_"
    }

    return;
}

export async function unblockCard(id: number) {
    await cardsRepository.update(id, { isBlocked: false });
    return;
}

export async function rechargeCardById(cardId: number, amount: number) {
    const rechargeData = { cardId, amount };
    await rechargeRepository.insert(rechargeData);
    return;
}

export async function checkCardAndBusinessTypes(cardId: number, businessId: number) {
    const card = await cardsRepository.findById(cardId);
    const business = await businessRepository.findById(businessId);

    if (card.type !== business.type) throw {
        type: "invalid_card_and_business_types",
        message: "_this type of card does not match this establishment type_"
    }

    return;
}

export async function checkCardBalance(cardId: number, paymentValue: number) {
    const cardBalance = await getCardBalance(cardId);

    if (cardBalance.balance < paymentValue) throw {
        type: "not_enough_money",
        message: "_you do not have enough money to make this purchase_"
    }
}

export async function makePayment(cardId: number, businessId: number, paymentValue: number) {
    await paymentRepository.insert({cardId, businessId, amount: paymentValue});
    return;
}

export async function getOriginalCardData(cardId: number){
    const {employeeId, cardholderName, expirationDate, type} = await cardsRepository.findById(cardId);
    return {
        employeeId,
        cardholderName,
        expirationDate,
        type
    }
}

export async function deleteCardById(cardId: number) {
    return await cardsRepository.remove(cardId);
}