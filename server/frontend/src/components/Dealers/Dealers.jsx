import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  let [states, setStates] = useState([])

  //let root_url = window.location.origin
  let dealer_url = "/djangoapp/get_dealers";
  //console.log("dealer_url", root_url + dealer_url);

  let dealer_url_by_state = "/djangoapp/get_dealers/";

  const filterDealers = async (state) => {
    dealer_url_by_state = dealer_url_by_state + state;
    const res = await fetch(dealer_url_by_state, {
      method: "GET"
    });
    console.log("dealer_url_by_state", res);
    const retobj = await res.json();
    if (retobj.status === 200) {
      setDealersList(retobj.dealers);
    }
    
  }

  const get_dealers = async () => {
    try {
      const res = await fetch(dealer_url, {
        method: "GET"
      });

      const retobj = await res.json();
      console.log("retobj", retobj.dealers);

      if (res.status === 200) {


        let states = [];
        retobj.dealers.forEach((dealer) => {
          states.push(dealer.state)
        });

        setStates(Array.from(new Set(states)))
        setDealersList(retobj.dealers);

      } else {
        console.warn("No se encontraron dealers o respuesta inválida.");
      }
    } catch (error) {
      console.error("Error al obtener dealers:", error);
    }
    /*
    const res = await fetch('http://localhost:3030/fetchDealers', {
      method: "GET"
    });


    const retobj = await res.json();
    console.log("retobj", res.status);
    try {
      if (res.retobj === 200) {
        console.log("retobj", retobj);

        let all_dealers = Array.from(retobj.dealers)
        console.log("resss", all_dealers);

        let states = [];
        all_dealers.forEach((dealer) => {
          states.push(dealer.state)
        });

        setStates(Array.from(new Set(states)))
        setDealersList(all_dealers)
      }
    } catch (error) {
      console.log("Error fetching dealers:", error);
    }

      */

  }
  useEffect(() => {
    get_dealers();
  }, []);


  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
  return (
    <div>
      <Header />

      <table className='table'>
        <tr>
          <th>ID</th>
          <th>Dealer Name</th>
          <th>City</th>
          <th>Address</th>
          <th>Zip</th>
          <th>
            <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
              <option value="" selected disabled hidden>State</option>
              <option value="All">All States</option>
              {states.map(state => (
                <option value={state}>{state}</option>
              ))}
            </select>

          </th>
          {isLoggedIn ? (
            <th>Review Dealer</th>
          ) : <></>
          }
        </tr>
        {dealersList.map(dealer => (
          <tr>
            <td>{dealer['id']}</td>
            <td><a href={'/dealer/' + dealer['id']}>{dealer['full_name']}</a></td>
            <td>{dealer['city']}</td>
            <td>{dealer['address']}</td>
            <td>{dealer['zip']}</td>
            <td>{dealer['state']}</td>
            {isLoggedIn ? (
              <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review" /></a></td>
            ) : <></>
            }
          </tr>
        ))}
      </table>;
    </div>
  )
}

export default Dealers
