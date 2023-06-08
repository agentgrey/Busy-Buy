import Style from './home.module.css';
import Data from '../../Data/data';
import { NavLink } from 'react-router-dom';
import { useValue } from '../../context';

function Home() {
  const { searchTerm, handleAdd} = useValue();
  const dataArray = Object.values(Data); 

// Filter the products based on the search term
  const filteredProducts = dataArray.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={Style.container}>
        {filteredProducts.map((item, id) => (
          <div key={id} className={Style.product}>
            <img src={item.img} alt="Product" />
            <h2>{item.title}</h2>
            <h3>₹ {item.price}</h3>
            <NavLink>
              <button onClick={()=>handleAdd(item)}>Add To Cart</button>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
