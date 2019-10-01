const CardModel = require('../model/card')
const PaymentTemplate = require('./PaymentTemplate');

class CardPaymentService extends PaymentTemplate {
    constructor() {
        super();
    }
    validateFields(data) {
        return (data.card && data.cvc && data.exp);
    }

    async checkAccountExistance(data) {
        var cardObj = {};
        await CardModel.findOne({ card: data.card, cvc: data.cvc, exp: data.exp }, (err, val) => {
            if (err) {
                console.log(err)
            } else if (val) {
                cardObj = val;
            }
        });
        return cardObj;
    }

    checkAmount(currentAmount, purchaseAmount) {
        return (currentAmount >= purchaseAmount);
    }

    reduceAmount(val, purchaseAmount) {
        const newAmt = val.amount - purchaseAmount;
        val.set({...val, amount: newAmt});
        val.save();
    }
}

module.exports = CardPaymentService;