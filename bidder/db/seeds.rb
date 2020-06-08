# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Bid.delete_all 
Auction.delete_all
User.delete_all

NUM_AUCTION = 10
NUM_USER = 3
PASSWORD = 'supersecret'

super_user = User.create(
    email: 'js@winterfell.gov',
    password: PASSWORD
)

NUM_USER.times do
    User.create(
        email: Faker::Internet.email,
        password: PASSWORD
    )
end

users = User.all

NUM_AUCTION.times do 
    created_at = Faker::Date.backward(days: 365 * 2)
    a = Auction.create(
        title: Faker::Hacker.say_something_smart,
        description: Faker::ChuckNorris.fact,
        ends_at: Faker::Date.forward(days: 365*1),
        user: users.sample, 
        reserve_price: Faker::Number.between(from:100, to:500),
        created_at: created_at,
        updated_at: created_at
    )
    if a.valid? 
        a.bids = rand(0..2).times.map do 
          Bid.new(price: Faker::Number.between(from:10, to:99) , user: users.sample)
        end
        
    end
    
end

puts "Created #{User.count} users"
puts "Created #{Auction.count} Auctions"
puts "Created #{Bid.count} bids"




