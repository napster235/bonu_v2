# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

User.create!(name: 'test', email: 'test@tewst.com', password: '123456')

10.times do
  Bon.create!(purchase_date: Faker::Date.between(from: 100.days.ago, to: Date.today), amount: Faker::Number.within(range: 1..3000), notes: Faker::Games::Pokemon.name, user_id: 1)
end

puts 'Seed complete💪'