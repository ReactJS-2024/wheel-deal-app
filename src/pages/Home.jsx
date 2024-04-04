import { Link } from "react-router-dom"

function Home() {
 return (
   <>
       <div className="jumbotron p-5">
           <h1 className="display-4">Welcome to Wheel Deal!</h1>
           <p className="lead">Most visited car selling website in our region.</p>
           <hr className="my-4"/>
           <div>
               <p>At Wheel Deal, we understand that buying or selling a vehicle is more than just a transaction—it's a key part of your lifestyle. That's why we've dedicated ourselves to providing an easy, efficient, and enjoyable experience for our users. Whether you're in the market for a sleek sports car, a family SUV, or a dependable work truck, we've got you covered.</p>
               <h3>Our mission</h3>
               <p>Our mission is simple: to connect vehicle buyers and sellers in a dynamic marketplace where they can effortlessly find what they're looking for. With an extensive range of listings, from brand new models to pre-owned gems, Wheel Deal is the go-to platform for all your automotive needs.</p>
               <h3>Our Vision</h3>
               <p>Looking ahead, Wheel Deal aims to revolutionize the vehicle marketplace. We're not just facilitating transactions; we're fostering connections, empowering consumers, and driving the future of vehicle commerce. Our vision is a world where the journey of buying or selling a vehicle is as enjoyable as the destination.</p>
               <h3>Join Us on the Road Ahead</h3>
               <p>Ready to embark on your next automotive adventure? Join the Wheel Deal community today and experience the difference. Whether you're buying, selling, or just browsing, we're here to support you every step of the way.</p>
           </div>
           <p className="lead">
               <Link to='/auth/register' className="btn btn-primary btn-lg">Join our community</Link>
           </p>
       </div>
   </>
 )
}


export default Home