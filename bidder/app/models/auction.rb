class Auction < ApplicationRecord
  has_many :bids
  belongs_to :user
end
