module Mutations
  class UpdateBon < BaseMutation
    field :bon, BonType, null: false

    argument :id, ID, required: true
    argument :purchaseDate, String, required: false
    argument :notes, String, required: false
    argument :amount, Integer, required: false

    def resolve(**args)
      bon = Bon.find(args[:id])
      bon.update(args)
      {
        bon: bon
      }
    end
  end
end
