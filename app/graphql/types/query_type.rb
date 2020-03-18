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


end
