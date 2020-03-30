class Types::QueryType < Types::BaseObject
  description "root query"

  field :users, [UserType], null: true do
    description "gets all users"
  end

  # field :bons, [BonType], null: true do
  #   description "gets all bons"
  # end

  add_field GraphQL::Types::Relay::NodeField

  field :bons, resolver: Resolvers::BonsSearch

  def bons
    Bon.all
  end

  def users
    User.all
  end

  field :bon, BonType, null: false do
    argument :id, Int, required: false
  end

  def bon(id:)
    Bon.find(id)
  end
end
