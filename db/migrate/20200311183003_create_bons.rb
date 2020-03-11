class CreateBons < ActiveRecord::Migration[6.0]
  def change
    create_table :bons do |t|
      t.date :purchase_date
      t.integer :amount
      t.string :notes

      t.timestamps
    end
  end
end
