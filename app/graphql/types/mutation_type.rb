module Types
  class MutationType < Types::BaseObject
    field :delete_bon, mutation: Mutations::DeleteBon
    field :update_bon, mutation: Mutations::UpdateBon

    field :create_bon, mutation: Mutations::CreateBon
  end
end
