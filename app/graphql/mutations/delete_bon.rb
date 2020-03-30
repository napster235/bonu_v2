module Mutations
  class DeleteBon < BaseMutation
    field :bon, BonType, null: true

    argument :id, ID, required: true

    def resolve(**args)
      bon = Bon.find(args[:id])
      bon.destroy
      {
        bon: bon
      }
    end
  end
end
