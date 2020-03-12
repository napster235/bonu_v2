class AddUserReferenceToBons < ActiveRecord::Migration[6.0]
  def change
    add_reference :bons, :user, foreign_key: true
  end
end
