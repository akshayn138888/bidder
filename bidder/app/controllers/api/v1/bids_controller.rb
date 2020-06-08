class Api::V1::BidsController < Api::ApplicationController
    def create 
        auction = Auction.find(params[:auction_id])
        bid = Bid.new params.require(:bid).permit(:price)
        bid.auction = auction
        bid.user = current_user
        if bid.save
            render(json: { id: auction.id })
        else
            render(
              json: { errors: bid.errors },
              status: 422 
            )
        end
    end
end
