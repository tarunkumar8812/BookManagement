import Navbar from '../components/navbar/Navbar'
import Footer from '../components//footer/Footer'
import Header from '../components/header/Header'
import Books from '../components/books/Books'
import Carousel from '../components/carousel/Carousel'
import FilterPanel from '../components/filterPanel/FilterPanel'

const Home = () => {

    return (
        <>
            <Navbar />
            <Header />
            <Carousel />
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <FilterPanel />
                <Books />
            </div>
            <Footer />
        </>
    )
}

export default Home