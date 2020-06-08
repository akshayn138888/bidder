class AuctionCollectionSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :description,
    :reserve_price,
    :ends_at,
    :created_at
  )
end
