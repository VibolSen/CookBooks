import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AddRecipe from "../components/AddRecipe"

export default function AddRecipePage () {
    return (
        <div>
            <Navbar />
            <div className="py-5">
            <AddRecipe />
            </div>
            <Footer />
        </div>
    )
}