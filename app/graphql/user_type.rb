class UserType < GraphQL::Schema::Object
  field :id, ID, null: true
  field :name, String, null: true
  field :email, String, null: true
  field :bons, [BonType], null: true
end
