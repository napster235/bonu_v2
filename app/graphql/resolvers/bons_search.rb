require 'search_object/plugin/graphql'
require 'graphql/query_resolver'

class Resolvers::BonsSearch
  include SearchObject.module(:graphql)

  scope { Bon.all }

  type types[BonType]

  class BonFilter < ::Types::BaseInputObject
    argument :purchase_date, String, required: false
  end

  class BonOrderBy < ::Types::BaseEnum
    value 'createdAt_ASC'
    value 'createdAt_DESC'
  end


  option :filter, type: BonFilter, with: :apply_filter
  option :first, type: Integer, with: :apply_first
  option :skip, type: Integer, with: :apply_skip

  option :order_by, type: BonOrderBy, default: 'createdAt_DESC'


  def apply_filter(scope, value)
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def normalize_filters(value, branches = [])
    scope = Bon.all
    scope = scope.where(purchase_date: value[:purchase_date])
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

  def apply_order_by_with_created_at_asc(scope)
    scope.order('created_at ASC')
  end

  def apply_order_by_with_created_at_desc(scope)
    scope.order('created_at DESC')
  end

  def fetch_results
    # NOTE: Don't run QueryResolver during tests
    return super unless context.present?

    GraphQL::QueryResolver.run(Bon, context, BonType) do
      super
    end
  end
end