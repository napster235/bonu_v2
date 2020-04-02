class BonType < GraphQL::Schema::Object
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false #was Types::DateTimeType
  field :id, ID, null: true
  field :purchaseDate, String, null: true
  field :amount, Integer, null: true
  field :notes, String, null: true
  field :userId, ID, null: true
  field :user, UserType, null: true
end
