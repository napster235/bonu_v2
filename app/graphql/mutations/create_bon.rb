
module Mutations
  class CreateBon < BaseMutation
    # arguments passed to the `resolve` method
    argument :purchaseDate, String, required: true
    argument :notes, String, required: true
    argument :amount, Integer, required: true
    argument :userId, ID, required: true
    # return type from the mutation
    type BonType

    def resolve(purchaseDate: nil, notes: nil, amount: nil, userId: nil)
      Link.create!(
        notes: notes,
        amount: amount,
        userId: userId,
        purchaseDate: purchaseDate
      )
    end
  end
end