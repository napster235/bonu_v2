# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

lista_bonuri = [
    ["01-02-2018", 203, "Bon Lidl"],
    ["01-03-2018", 204, "Bon Mega Image"],
    ["01-04-2018", 205, "Bon alimentara"],
    ["01-05-2018", 206, "Bon benzinarie"],
    ["01-05-2018", 33, "Bon mega"],
    ["01-05-2018", 876, "Bon tigari"],
    ["01-05-2018", 4, "Bon mancare"],
    ["01-05-2018", 54, "Bon benzinarie"],
    ["01-05-2018", 124, "Bon food panda"],
    ["01-05-2018", 789, "Bon glovo"],
    ["01-05-2018", 334, "Bon cafea"],
    ["01-05-2018", 6532, "Bon shaorma"],
    ["01-05-2018", 65, "Bon pizza"],
    ["01-05-2018", 324, "Bon suc"]
]

lista_bonuri.each do |purchase_date, amount, notes|
  Bon.create(purchase_date: purchase_date, amount: amount, notes: notes, user_id:1)
end

puts 'asdasdasdasdas'