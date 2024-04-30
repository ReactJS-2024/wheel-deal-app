import AdFilters from "./AdFilters"
import AllAds from "./AllAds"
import NewAd from "./NewAd"


function Ads() {
  return (
    <div>
        <div className="d-flex justify-content-evenly">
            <NewAd/>
            <AdFilters/>
        </div>
        <hr className="w-50 mx-auto" />
        <AllAds/>
    </div>
  )
}

export default Ads