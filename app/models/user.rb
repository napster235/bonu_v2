class User < ApplicationRecord
  #Validations
  validates_presence_of :name, :email, :password_digest
  validates :email, uniqueness: true
  has_many :bons, dependent: :destroy
  #encrypt password
  has_secure_password
end
