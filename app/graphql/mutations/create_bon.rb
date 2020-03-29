
module Mutations
  class CreateBon < BaseMutation
    # arguments passed to the `resolve` method
    argument :purchaseDate, String, required: true
    argument :notes, String, required: true
    argument :amount, Integer, required: true
    argument :userId, ID, required: true

    # return type from the mutation
    type BonType

    def resolve(purchase_date: nil, notes: nil, amount: nil, user_id: nil)
      bon = Bon.create!(
        notes: notes,
        amount: amount,
        user_id: 1,
        purchase_date: purchase_date
      )
      { bon }
    end
  end
end