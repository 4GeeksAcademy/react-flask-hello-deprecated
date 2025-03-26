import React, { useContext } from "react";
import { OnFireItem } from "./onfireitem"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Onfire = ({ type1, id1, type2, id2 }) => {

    const { store } = useContext(Context)
    const products1 = store[type1]
    const products2 = store[type2]
    let productId1 = ""
    let productId2 = ""
    let fireItem1 = ""
    let fireItem2 = ""

    const getId1 = () => {
        if (type1 == "phones") {
            productId1 = "smartphone_id"
        } else if (type1 == "tvs") {
            productId1 = "tv_id"
        } else if (type1 == "laptops") {
            productId1 = "laptop_id"
        }
    }

    const getId2 = () => {
        if (type2 == "phones") {
            productId2 = "smartphone_id"
        } else if (type2 == "tvs") {
            productId2 = "tv_id"
        } else if (type2 == "laptops") {
            productId2 = "laptop_id"
        }
    }

    getId1();
    getId2();

    products1.forEach((element) => {
        if (element[productId1] == id1) {
            fireItem1 = element
        };
    });

    products2.forEach((element) => {
        if (element[productId2] == id2) {
            fireItem2 = element
        };
    });



    return (<>
        <div id="inicio" className="container-card-tendencia">
            <Link to={`/tv-info/${id1}`}>
                <OnFireItem item={fireItem1} itemName={type1} />
            </Link>
            <Link to={`/laptop-info/${id2}`}>
                <OnFireItem item={fireItem2} itemName={type2} />
            </Link>
        </div>
    </>)
}