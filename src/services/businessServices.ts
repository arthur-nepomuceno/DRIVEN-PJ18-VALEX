import * as businessRepository from '../repositories/businessRepository';

export async function checkBusinessId(id: number) {
    const response = await businessRepository.findById(id)

    if (!response) throw {
        type: "invalid_business_id",
        message: "_this establishment does not exist_"
    }

    return;
}