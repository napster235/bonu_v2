require 'search_object/plugin/graphql'
require 'graphql/query_resolver'

class Resolvers::BonsSearch
  include SearchObject.module(:graphql)

  scope { Bon.all }

  type types[BonType]

  class BonFilter < ::Types::BaseInputObject
    argument :purchase_date, GraphQL::Types::ISO8601Date, required: false
    argument :amount, Integer, required: false
    argument :notes, String, required: false
  end

  class BonOrderBy < ::Types::BaseEnum
    value 'createdAt_ASC'
    value 'createdAt_DESC'
    value 'purchase_dates_ASC'
    value 'purchase_dates_DESC'
    value 'amount_ASC'
    value 'amount_DESC'
  end


  option :filter, type: BonFilter, with: :apply_filter
  option :first, type: Integer, with: :apply_first
  option :skip, type: Integer, with: :apply_skip

  option :order_by, type: BonOrderBy, default: 'createdAt_DESC', with: :apply_order


  def apply_filter(scope, value)
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def normalize_filters(value, branches = [])
    scope = Bon.all
    scope = scope.where(purchase_date: value[:purchase_date]) if value[:purchase_date]
    scope = scope.where(amount: value[:amount]) if value[:amount]
    scope = scope.where(notes: value[:notes]) if value[:notes]

    branches << scope

    value[:OR].reduce(branches) { |s, v| normalize_filters(v, s) } if value[:OR].present?

    branches
  end

  def apply_first(scope, value)
    scope.limit(value)
  end

  def apply_skip(scope, value)
    scope.offset(value)
  end

  def apply_order(scope, value)
    orders = {
      'createdAt_ASC': 'created_at ASC',
      'createdAt_DESC': 'created_at DESC',
      'purchaseDate_ASC': 'purchase_date ASC',
      'purchaseDate_DESC': 'purchase_date DESC',
      'amount_ASC': 'amount ASC',
      'amount_DESC': 'amount DESC',
    }
    scope.order(orders[value.to_sym]) 
  end

 
  def fetch_results
    # NOTE: Don't run QueryResolver during tests
    return super unless context.present?

    GraphQL::QueryResolver.run(Bon, context, BonType) do
      super
    end
  end
end