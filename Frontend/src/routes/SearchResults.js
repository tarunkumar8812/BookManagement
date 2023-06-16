import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import FilterPanel from '../components/filterPanel/FilterPanel'
import Header from '../components/header/Header'
import List from '../components/list/List'

const SearchResults = () => {

    return (
        <>
            <Navbar />
            <Header />

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <FilterPanel />
                <List />
            </div>
            <div> <Footer /></div>
        </>
    )
}

export default SearchResults