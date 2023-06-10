/** ------------------ IMPORTING CSS ------------------ **/
import Style from './home.module.css';
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useValue } from '../../context';
/** ------------------ IMPORTING COMPONENTS ------------------ **/
import Data from '../../Data/data';
/** ------------------ IMPORTING ROUTER MODULES ------------------ **/
import { NavLink } from 'react-router-dom';



/** ------------------ Function to display the home page ------------------ **/
function Home() {
  
  const { searchTerm, priceRange, setPriceRange, handleAdd} = useValue();
  const dataArray = Object.values(Data); 

/** ------------------ Filters data based on search term ------------------ **/
  const filteredProducts = dataArray.filter((item) => {
    const isInRange = priceRange > 0 ? item.price <= priceRange : true;
    const isSearchMatched = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return isInRange && isSearchMatched;
  });



  return (
    <div className={Style.container}>
      <div className={Style.filterContainer}>
        <h2>Filter</h2> <br/>
        <div>
          <label style={{"fontWeight": "bold"}}>Price Range: ₹{priceRange}</label>
          <input type="range" id="priceRange" min="0" max="15000" step="100"
            value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
        </div>
        <div>
          <h4>Categories:</h4>
          <label>
            <input type="checkbox" name="men" />
            Men
          </label>
          <label>
            <input type="checkbox" name="women" />
            Women
          </label>
          <label>
            <input type="checkbox" name="kids" />
            Kids
          </label>
          <label>
            <input type="checkbox" name="electronics"/>
            Electronics
          </label>
          <label>
            <input type="checkbox" name="accessories" />
            Accessories
          </label>
          <label>
            <input type="checkbox" name="stationery" />
            Stationery
          </label>
        </div>
      </div>

      <div className={Style.itemContainer}>
        {filteredProducts.map((item, id) => (
          <div key={id} className={Style.product}>
            <img src={item.img} alt="Product" />
            <h2>{item.title}</h2>
            <h3>₹ {item.price}</h3>
            <NavLink>
              <button onClick={()=>handleAdd(item)} >Add To Cart</button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ------------------ EXPORTING MODULES ------------------ **/
export default Home;
