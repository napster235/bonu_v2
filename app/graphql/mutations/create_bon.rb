
module Mutations
  class CreateBon < BaseMutation
    # arguments passed to the `resolve` method
    argument :purchaseDate, String, required: true
    argument :notes, String, required: true
    argument :amount, Integer, required: true
    argument :userId, ID, required: true

    field :bon, BonType, null: false

    # return type from the mutation

    def resolve(purchase_date: nil, notes: nil, amount: nil, user_id: nil)
     bon = Bon.create!(
        notes: notes,
        amount: amount,
        user_id: user_id,
        purchase_date: purchase_date
      )
     { bon: bon }
    end
  end
end