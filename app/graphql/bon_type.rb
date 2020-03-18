class BonType < GraphQL::Schema::Object
  field :created_at, Types::DateTimeType, null: false
  field :id, ID, null: true
  field :purchaseDate, String, null: true
  field :amount, Integer, null: true
  field :notes, String, null: true
  field :userId, ID, null: true
  field :user, UserType, null: true
end
