class User < ApplicationRecord
    has_secure_password
    has_many :auctions
    has_many :bids
end
