import React, { useContext, useEffect } from "react";
import { WelcomeCatalog } from "../component/welcome-catalog-phones";
import { CatalogCatalog } from "../component/catalog-catalog";
import { Context } from "../store/appContext";


export const Catalog = ({ productList }) => {
    const { actions } = useContext(Context);

    useEffect(() => {
        actions.setPositiveColors();
        actions.setNavbarVisibility();
    }, []);

    return (
        <>
            <div className="p-3">
                <WelcomeCatalog />
                <CatalogCatalog productList={productList} />
            </div>
        </>
    )
}

