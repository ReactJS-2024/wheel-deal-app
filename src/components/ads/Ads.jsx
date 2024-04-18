import AllAds from "./AllAds"
import NewAd from "./NewAd"


function Ads() {
  return (
    <div>
        <NewAd/>
        <hr className="w-50 mx-auto" />
        <AllAds/>
    </div>
  )
}

export default Ads