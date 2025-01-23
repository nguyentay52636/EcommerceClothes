class CustomerController { 
    async getCustomer(req, res) {
        try {
          const loyaltyDiscounts = await LoyaltyDiscountModel.find({ status: 'active' }).sort({ requiredPoints: -1 });
          if (!loyaltyDiscounts || loyaltyDiscounts.length === 0) {
            return res.status(404).json({ message: "No active loyalty discounts available" });
          }
      
          for (let customer of await CustomerModel.find()) {
            const eligibleDiscount = loyaltyDiscounts.find(discount => customer.point >= discount.requiredPoints);
            
            if (eligibleDiscount) {
    
              if (!customer.LoyaltyDicountId || customer.LoyaltyDicountId.toString() !== eligibleDiscount._id.toString()) {
                await CustomerModel.updateOne(
                  { _id: customer._id },
                  { $set: { LoyaltyDicountId: eligibleDiscount._id } }
                );
              }
            }
          }
      
          const customers = await CustomerModel.find().populate('LoyaltyDicountId');
          res.status(200).json(customers);
        } catch (error) {
          res.status(500).json({ message: "Error retrieving or updating customers", error });
        }
      }
}