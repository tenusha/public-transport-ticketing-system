class PaymentTemplate {
    constructor() { };
    validateFields(data) {
        throw new Error('No implementation found');
    }
    checkAccountExistance(data) {
        throw new Error('No implementation found');
    }
    checkAmount(currentAmount, purchaseAmount) {
        throw new Error('No implementation found');
    }
    reduceAmount(val, purchaseAmount) {
        throw new Error('No implementation found');
    }
    async pay(data) {
        console.log(data)
        if (this.validateFields(data)) {
            const cardObj =  await this.checkAccountExistance(data);
            if (cardObj && this.checkAmount(cardObj.amount, data.total)) {
                this.reduceAmount(cardObj, data.total);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

module.exports = PaymentTemplate;